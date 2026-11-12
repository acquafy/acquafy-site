-- Product names in orders match the website (lib/products.ts, PRODUCT_CATALOG): "Neo ULTRA", "Neo SMART H₂"…
-- Orders already placed keep the title they were placed with (items snapshot).
update public.order_products p set title=v.title from (values
('neo-up','Neo UP'),
('neo-fit','Neo FIT'),
('neo-touch','Neo TOUCH'),
('neo-plus','Neo PLUS'),
('neo-smart-h2','Neo SMART H₂'),
('neo-ultra','Neo ULTRA'),
('neo-ultra-spark','Neo ULTRA SPARK'),
('neo-ultra-spark-h2','Neo ULTRA SPARK H₂'),
('neo-max','Neo MAX'),
('neo-max-spark','Neo MAX SPARK'),
('neo-max-spark-h2','Neo MAX SPARK H₂'),
('neo-infinity','Neo INFINITY'),
('neo-infinity-spark','Neo INFINITY SPARK'),
('neo-infinity-spark-h2','Neo INFINITY SPARK H₂'),
('neo-prestige','Neo PRESTIGE'),
('neo-prestige-spark','Neo PRESTIGE SPARK'),
('neo-prestige-spark-h2','Neo PRESTIGE SPARK H₂'),
('neo-prime','Neo PRIME'),
('neo-prime-spark','Neo PRIME SPARK'),
('neo-prime-spark-h2','Neo PRIME SPARK H₂'),
('acquafy-media','Acquafy Media')
) as v(id,title) where p.id=v.id;
