import { useMemo, useState } from "react";
import Image from "next/image";
import { HiArrowUpTray, HiCheckCircle, HiExclamationCircle, HiPencil, HiPlus, HiTrash } from "react-icons/hi2";
import { PORTFOLIO_CATEGORIES } from "../lib/content";

const emptyForm = {
  title: { en: "", tr: "" }, description: { en: "", tr: "" }, categories: [], clientIndustry: "", year: new Date().getFullYear(), role: "", tools: "",
  cover: { url: "", publicId: "" }, video: { url: "", publicId: "" }, aspectRatio: "9:16", featured: false, published: false, order: 0,
};

const UploadField = ({ label, accept, resourceType, value, csrfToken, onUploaded }) => {
  const [state, setState] = useState({ progress: 0, uploading: false, error: "", success: false });

  const upload = async (file) => {
    if (!file) return;
    setState({ progress: 0, uploading: true, error: "", success: false });
    try {
      const signatureResponse = await fetch("/api/admin/upload-signature", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-csrf-token": csrfToken },
        body: JSON.stringify({ resourceType, mimeType: file.type, size: file.size }),
      });
      const signature = await signatureResponse.json();
      if (!signatureResponse.ok) throw new Error(signature.error || "Could not authorize upload.");

      const result = await new Promise((resolve, reject) => {
        const body = new FormData();
        body.append("file", file);
        body.append("api_key", signature.apiKey);
        body.append("timestamp", signature.timestamp);
        body.append("folder", signature.folder);
        body.append("signature", signature.signature);
        const request = new XMLHttpRequest();
        request.open("POST", `https://api.cloudinary.com/v1_1/${signature.cloudName}/${resourceType}/upload`);
        request.upload.onprogress = (event) => event.lengthComputable && setState((current) => ({ ...current, progress: Math.round((event.loaded / event.total) * 100) }));
        request.onerror = () => reject(new Error("Network error during upload."));
        request.onload = () => {
          let data;
          try { data = JSON.parse(request.responseText); } catch { data = {}; }
          if (request.status >= 200 && request.status < 300) resolve(data);
          else reject(new Error(data.error?.message || "Cloudinary upload failed."));
        };
        request.send(body);
      });
      onUploaded({ url: result.secure_url, publicId: result.public_id });
      setState({ progress: 100, uploading: false, error: "", success: true });
    } catch (error) {
      setState({ progress: 0, uploading: false, error: error.message, success: false });
    }
  };

  return (
    <div>
      <label onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); upload(event.dataTransfer.files[0]); }} className="flex min-h-[130px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/25 bg-black/15 p-4 text-center hover:border-accent">
        <HiArrowUpTray className="mb-2 text-2xl text-accent" />
        <span className="text-sm font-semibold">{label}</span>
        <span className="mt-1 text-xs text-white/45">Drag & drop or choose a file</span>
        <input type="file" className="sr-only" accept={accept} onChange={(event) => upload(event.target.files[0])} />
      </label>
      {state.uploading ? <div className="mt-2 h-2 overflow-hidden rounded bg-white/10"><div className="h-full bg-accent transition-all" style={{ width: `${state.progress}%` }} /></div> : null}
      <div aria-live="polite" className="mt-2 min-h-[20px] text-xs">
        {state.uploading ? `${state.progress}% uploaded` : null}
        {state.success ? <span className="inline-flex items-center gap-1 text-green-300"><HiCheckCircle /> Upload complete</span> : null}
        {state.error ? <span className="inline-flex items-center gap-1 text-red-300"><HiExclamationCircle /> {state.error}</span> : null}
        {!state.uploading && !state.error && value?.url ? <span className="block truncate text-white/45">{value.url}</span> : null}
      </div>
    </div>
  );
};

const Field = ({ label, children }) => <label className="block text-sm font-medium text-white/80">{label}{children}</label>;
const inputClass = "mt-2 w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 text-white placeholder:text-white/25";

const AdminPortfolioManager = ({ initialItems, csrfToken, setupError }) => {
  const [items, setItems] = useState(initialItems);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState({ saving: false, message: "", error: "" });
  const sortedItems = useMemo(() => [...items].sort((a, b) => a.order - b.order), [items]);
  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const setLocalized = (key, lang, value) => setForm((current) => ({ ...current, [key]: { ...current[key], [lang]: value } }));

  const reset = () => { setForm(emptyForm); setEditingId(null); setStatus({ saving: false, message: "", error: "" }); };
  const edit = (item) => {
    setEditingId(item._id);
    setForm({ ...item, tools: item.tools.join(", ") });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async (event) => {
    event.preventDefault();
    setStatus({ saving: true, message: "", error: "" });
    const url = editingId ? `/api/admin/portfolio/${editingId}` : "/api/admin/portfolio";
    try {
      const response = await fetch(url, { method: editingId ? "PUT" : "POST", headers: { "Content-Type": "application/json", "x-csrf-token": csrfToken }, body: JSON.stringify({ ...form, tools: form.tools.split(",").map((value) => value.trim()).filter(Boolean) }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Save failed.");
      setItems((current) => editingId ? current.map((item) => item._id === editingId ? data.item : item) : [...current, data.item]);
      setForm(emptyForm);
      setEditingId(null);
      setStatus({ saving: false, message: "Project saved successfully.", error: "" });
    } catch (error) {
      setStatus({ saving: false, message: "", error: error.message });
    }
  };

  const remove = async (item) => {
    if (!window.confirm(`Delete “${item.title.en}” and its Cloudinary media? This cannot be undone.`)) return;
    try {
      const response = await fetch(`/api/admin/portfolio/${item._id}`, { method: "DELETE", headers: { "x-csrf-token": csrfToken } });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Delete failed.");
      setItems((current) => current.filter((currentItem) => currentItem._id !== item._id));
      if (editingId === item._id) reset();
    } catch (error) { setStatus({ saving: false, message: "", error: error.message }); }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#321555,transparent_35%),#0d0e1a] px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div><p className="text-xs uppercase tracking-[0.25em] text-accent">mavisker.com</p><h1 className="text-3xl font-bold">Creative portfolio manager</h1><p className="text-sm text-white/45">Open administrator access</p></div>
          <a href="/creative-work" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/15 px-4 py-2 text-sm">View public page</a>
        </header>

        <div className="grid items-start gap-7 xl:grid-cols-[minmax(0,1fr)_360px]">
          <form onSubmit={submit} className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur sm:p-8">
            {setupError ? <p role="alert" className="mb-5 rounded-xl bg-red-500/15 p-3 text-sm text-red-200">Database setup: {setupError}</p> : null}
            <div className="mb-6 flex items-center justify-between"><h2 className="text-xl font-bold">{editingId ? "Edit project" : "Add project"}</h2>{editingId ? <button type="button" onClick={reset} className="text-sm text-accent">Cancel edit</button> : null}</div>
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="English title (required)"><input required maxLength={160} value={form.title.en} onChange={(event) => setLocalized("title", "en", event.target.value)} className={inputClass} /></Field>
              <Field label="Turkish title (optional)"><input maxLength={160} value={form.title.tr} onChange={(event) => setLocalized("title", "tr", event.target.value)} placeholder="Uses English title when empty" className={inputClass} /></Field>
              <Field label="English description (optional)"><textarea maxLength={2400} value={form.description.en} onChange={(event) => setLocalized("description", "en", event.target.value)} className={`${inputClass} min-h-[130px]`} /></Field>
              <Field label="Turkish description (optional)"><textarea maxLength={2400} value={form.description.tr} onChange={(event) => setLocalized("description", "tr", event.target.value)} className={`${inputClass} min-h-[130px]`} /></Field>
            </div>

            <fieldset className="mt-6"><legend className="mb-3 text-sm font-medium text-white/80">Categories</legend><div className="flex flex-wrap gap-2">{PORTFOLIO_CATEGORIES.map((category) => <label key={category.value} className={`cursor-pointer rounded-full border px-3 py-2 text-xs ${form.categories.includes(category.value) ? "border-accent bg-accent/20" : "border-white/15 bg-black/10"}`}><input type="checkbox" className="sr-only" checked={form.categories.includes(category.value)} onChange={() => set("categories", form.categories.includes(category.value) ? form.categories.filter((value) => value !== category.value) : [...form.categories, category.value])} />{category.en}</label>)}</div></fieldset>

            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <Field label="Client / Industry (optional)"><input maxLength={160} value={form.clientIndustry} onChange={(event) => set("clientIndustry", event.target.value)} className={inputClass} /></Field>
              <Field label="Role (optional)"><input maxLength={240} value={form.role} onChange={(event) => set("role", event.target.value)} className={inputClass} /></Field>
              <Field label="Year (automatic)"><input type="number" min="2000" max="2100" value={form.year} onChange={(event) => set("year", Number(event.target.value))} className={inputClass} /></Field>
              <Field label="Display order (automatic)"><input type="number" min="-100000" max="100000" value={form.order} onChange={(event) => set("order", Number(event.target.value))} className={inputClass} /></Field>
            </div>
            <div className="mt-5 grid gap-5 md:grid-cols-[1fr_200px]"><Field label="Tools (optional, comma separated)"><input value={form.tools} onChange={(event) => set("tools", event.target.value)} className={inputClass} /></Field><Field label="Aspect ratio"><select value={form.aspectRatio} onChange={(event) => set("aspectRatio", event.target.value)} className={inputClass}><option value="9:16">9:16</option><option value="16:9">16:9</option><option value="1:1">1:1</option></select></Field></div>

            <div className="mt-6 grid gap-5 md:grid-cols-2"><UploadField label="Upload video (MP4, WebM, MOV · max 500 MB)" accept="video/mp4,video/webm,video/quicktime,.mov" resourceType="video" value={form.video} csrfToken={csrfToken} onUploaded={(value) => set("video", value)} /><UploadField label="Upload cover (JPEG, PNG, WebP · max 10 MB)" accept="image/jpeg,image/png,image/webp" resourceType="image" value={form.cover} csrfToken={csrfToken} onUploaded={(value) => set("cover", value)} /></div>
            <div className="mt-6 flex flex-wrap gap-5"><label className="flex items-center gap-2"><input type="checkbox" checked={form.featured} onChange={(event) => set("featured", event.target.checked)} /> Featured</label><label className="flex items-center gap-2"><input type="checkbox" checked={form.published} onChange={(event) => set("published", event.target.checked)} /> Published</label></div>

            {status.error ? <p role="alert" className="mt-5 rounded-xl bg-red-500/15 p-3 text-sm text-red-200">{status.error}</p> : null}{status.message ? <p role="status" className="mt-5 rounded-xl bg-green-500/15 p-3 text-sm text-green-200">{status.message}</p> : null}
            <button disabled={status.saving || !form.video.url || !form.cover.url || !form.categories.length} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-700 to-fuchsia-600 px-6 py-3 font-semibold disabled:cursor-not-allowed disabled:opacity-40">{editingId ? <HiPencil /> : <HiPlus />}{status.saving ? "Saving…" : editingId ? "Update project" : "Create project"}</button>
          </form>

          <aside className="sticky top-6 rounded-3xl border border-white/10 bg-white/[0.045] p-5"><h2 className="mb-4 font-bold">Preview before publishing</h2>{form.cover.url ? <div className="overflow-hidden rounded-2xl bg-black/30">{form.video.url ? <video controls preload="metadata" poster={form.cover.url} className="aspect-video w-full object-contain"><source src={form.video.url} /></video> : <Image unoptimized src={form.cover.url} width={640} height={360} alt="Project cover preview" className="aspect-video w-full object-cover" />}<div className="p-4"><p className="text-xs uppercase tracking-wider text-accent">{form.clientIndustry || "Client / Industry"} · {form.year}</p><h3 className="mt-1 text-lg font-bold">{form.title.en || "Project title"}</h3><p className="mt-2 line-clamp-4 text-xs text-white/55">{form.description.en || "Project description"}</p></div></div> : <div className="rounded-2xl border border-dashed border-white/15 p-10 text-center text-sm text-white/40">Upload a cover to see the preview.</div>}</aside>
        </div>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.045] p-5 sm:p-8"><h2 className="mb-5 text-xl font-bold">Projects ({items.length})</h2>{sortedItems.length ? <div className="grid gap-3">{sortedItems.map((item) => <article key={item._id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/15 p-4"><div><div className="flex items-center gap-2"><h3 className="font-semibold">{item.title.en}</h3><span className={`rounded-full px-2 py-1 text-[10px] ${item.published ? "bg-green-500/15 text-green-200" : "bg-yellow-500/15 text-yellow-200"}`}>{item.published ? "Published" : "Draft"}</span></div><p className="text-xs text-white/45">Order {item.order} · {item.aspectRatio} · {item.year}</p></div><div className="flex gap-2"><button type="button" onClick={() => edit(item)} aria-label={`Edit ${item.title.en}`} className="rounded-lg bg-white/10 p-3 text-accent"><HiPencil /></button><button type="button" onClick={() => remove(item)} aria-label={`Delete ${item.title.en}`} className="rounded-lg bg-red-500/15 p-3 text-red-300"><HiTrash /></button></div></article>)}</div> : <p className="text-sm text-white/45">No portfolio projects have been added yet.</p>}</section>
      </div>
    </main>
  );
};

export default AdminPortfolioManager;
