/**
 * The entire scroll-reveal runtime, shipped as an inline `<script>` at the end
 * of `<body>` rather than as a React effect.
 *
 * ## Why inline rather than a component
 *
 * `[data-reveal]` elements start at `opacity: 0`. If the code that clears that
 * only runs after React hydrates, any revealed element inside the first
 * viewport cannot paint until the framework bundle has downloaded, parsed and
 * hydrated — and if it is the largest element, it *becomes* the LCP. On
 * `/explore` that measured as LCP 2.5s against FCP 0.9s, with 82% of the time
 * attributed to render delay.
 *
 * Inline, it executes during HTML parse, so reveals are limited by layout
 * rather than by JavaScript delivery. It is ~600 bytes, it is not a module,
 * and it never enters the React tree.
 *
 * ## Two strategies, chosen per element
 *
 * The initial document and client-side navigations both use the same
 * IntersectionObserver. This avoids a synchronous getBoundingClientRect pass
 * during the critical render path; the observer already knows which elements
 * are visible and reports them without forcing layout from JavaScript.
 *
 * After a client-side navigation everything goes through the observer, so
 * content on the new page animates normally.
 *
 * `window.__ctcReveal` lets client-side route changes rescan for newly mounted
 * elements; see `RevealOnNavigate`. The observer is created once and reused.
 *
 * Reduced-motion and no-IntersectionObserver visitors are revealed
 * immediately, so content is never trapped behind an animation.
 */
export const REVEAL_SCRIPT = `(function(){
var o=null;
function reveal(n){n.setAttribute("data-visible","")}
function revealAll(n){for(var i=0;i<n.length;i++)reveal(n[i])}
function scan(){
var n=document.querySelectorAll("[data-reveal]:not([data-visible])"),i;
if(!n.length)return;
try{
if(window.matchMedia("(prefers-reduced-motion: reduce)").matches||!("IntersectionObserver" in window)){revealAll(n);return}
}catch(e){revealAll(n);return}
if(!o)o=new IntersectionObserver(function(es){
for(var j=0;j<es.length;j++){
if(!es[j].isIntersecting)continue;
reveal(es[j].target);
o.unobserve(es[j].target);
}
},{rootMargin:"0px 0px -8% 0px",threshold:0});
for(i=0;i<n.length;i++)o.observe(n[i]);
}
window.__ctcReveal=scan;
scan();
})();`;
