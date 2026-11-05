#!/bin/sh
set -eu
# Usage: sh scripts/lighthouse.sh <label> <base-url> / /linha-neo ...
# Run against a production build, with Chrome installed. Lighthouse 12 mobile defaults.
label=$1; base=$2; shift 2
out="${LIGHTHOUSE_OUTPUT_DIR:-/tmp/acquafy-lighthouse}/$label"; mkdir -p "$out"
for p in "$@"; do
  name=$(echo "$p" | tr '/' '_'); [ "$name" = "_" ] && name="_home"
  npx -y lighthouse@12 "$base$p" --quiet --chrome-flags="--headless=new" --only-categories=performance,accessibility,best-practices,seo --output=json --output-path="$out/$name.json" >/dev/null 2>&1
  node -e '
const r=require(process.argv[1]);const c=r.categories,a=r.audits;
const f=k=>a[k]?.displayValue??"-";
console.log([process.argv[2].padEnd(24),"P"+Math.round(c.performance.score*100),"A"+Math.round(c.accessibility.score*100),"BP"+Math.round(c["best-practices"].score*100),"SEO"+Math.round(c.seo.score*100),"FCP "+f("first-contentful-paint"),"LCP "+f("largest-contentful-paint"),"TBT "+f("total-blocking-time"),"CLS "+f("cumulative-layout-shift"),"SI "+f("speed-index"),"bytes "+f("total-byte-weight")].join(" | "))' "$out/$name.json" "$p"
done
