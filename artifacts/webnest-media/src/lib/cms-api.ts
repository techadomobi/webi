export type CmsContentBlock = {
  type?: string;
  text?: string;
  _id?: string;
  [key: string]: unknown;
};

export type CmsEntry = {
  _id: string;
  title: string;
  content: CmsContentBlock[];
  excerpt: string;
  coverImage?: string;
  focusKeyphrase?: string;
  seoKeywords?: string[];
  seoTitle?: string;
  slug: string;
  metaDescription?: string;
  category?: string;
  tags?: string[];
  writerName?: string;
  date?: string;
  images?: string[];
  websiteName?: string;
  isDeleted?: boolean;
  authorId?: string | null;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type CmsListParams = {
  page?: number;
  search?: string;
  category?: string;
  websiteName?: string;
  location?: string;
};

const CMS_BASE_URL = (import.meta.env.VITE_CMS_BASE_URL ?? 'https://click.creditsdeal.com').replace(/\/+$/, '');
export const CMS_WEBSITE_NAME = import.meta.env.VITE_CMS_WEBSITE_NAME ?? 'adomobi.com';

function buildQueryString(params: Record<string, string | number | undefined>) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined) return;
    query.set(key, String(value));
  });

  return query.toString();
}

function unwrapEntries(payload: unknown): CmsEntry[] {
  if (Array.isArray(payload)) {
    return payload as CmsEntry[];
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  const record = payload as Record<string, unknown>;
  for (const key of ['data', 'responseData', 'blogs', 'services', 'items', 'results']) {
    const value = record[key];
    if (Array.isArray(value)) {
      return value as CmsEntry[];
    }
  }

  if (typeof record.title === 'string' && typeof record.slug === 'string') {
    return [record as CmsEntry];
  }

  return [];
}

async function requestCms(path: string): Promise<unknown> {
  const response = await fetch(`${CMS_BASE_URL}${path}`, {
    headers: {
      Accept: 'application/json',
    },
  });

  const raw = await response.text();
  const payload = raw.trim() ? JSON.parse(raw) : null;

  if (!response.ok) {
    const message =
      (payload && typeof payload === 'object' && 'responseMessage' in payload && String((payload as Record<string, unknown>).responseMessage)) ||
      (payload && typeof payload === 'object' && 'message' in payload && String((payload as Record<string, unknown>).message)) ||
      response.statusText ||
      `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return payload;
}

export async function fetchCmsList(kind: 'blogs' | 'services', params: CmsListParams = {}): Promise<CmsEntry[]> {
  const query = buildQueryString({
    page: params.page ?? 1,
    search: params.search ?? '',
    category: params.category ?? '',
    websiteName: params.websiteName ?? CMS_WEBSITE_NAME,
    location: params.location ?? '',
  });

  const payload = await requestCms(kind === 'blogs' ? `/admin/listBlogs?${query}` : `/admin/listService?${query}`);
  return unwrapEntries(payload);
}

export async function fetchCmsEntry(kind: 'blogs' | 'services', slug: string): Promise<CmsEntry | null> {
  const payload = await requestCms(kind === 'blogs' ? `/admin/viewBlog?slug=${encodeURIComponent(slug)}` : `/admin/viewService?slug=${encodeURIComponent(slug)}`);
  const entries = unwrapEntries(payload);

  if (entries.length > 0) {
    return entries[0];
  }

  if (payload && typeof payload === 'object' && 'responseCode' in payload) {
    const responseCode = Number((payload as Record<string, unknown>).responseCode);
    if (responseCode === 404) {
      return null;
    }
  }

  return null;
}
