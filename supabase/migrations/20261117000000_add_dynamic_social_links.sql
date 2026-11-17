alter table public.site_settings
  add column if not exists social_links jsonb not null default '[]'::jsonb;

update public.site_settings
set social_links = jsonb_build_array(
  jsonb_build_object('id','facebook','platform','facebook','label','Facebook','url',coalesce(facebook_url,''),'icon_url',''),
  jsonb_build_object('id','youtube','platform','youtube','label','YouTube','url',coalesce(youtube_url,''),'icon_url',''),
  jsonb_build_object('id','tiktok','platform','tiktok','label','TikTok','url',coalesce(tiktok_url,''),'icon_url',''),
  jsonb_build_object('id','whatsapp','platform','whatsapp','label','WhatsApp','url',coalesce(whatsapp_url,''),'icon_url',''),
  jsonb_build_object('id','instagram','platform','instagram','label','Instagram','url',coalesce(instagram_url,''),'icon_url',''),
  jsonb_build_object('id','twitter','platform','twitter','label','Twitter / X','url',coalesce(twitter_url,''),'icon_url',''),
  jsonb_build_object('id','linkedin','platform','linkedin','label','LinkedIn','url',coalesce(linkedin_url,''),'icon_url',''),
  jsonb_build_object('id','telegram','platform','telegram','label','Telegram','url','','icon_url','')
)
where id = 1 and social_links = '[]'::jsonb;
