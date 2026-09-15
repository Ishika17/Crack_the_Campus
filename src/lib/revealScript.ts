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
 * On the initial document the script measures each element once and splits
 * them:
 *
 *  - **Already on screen** → marked `data-instant` and revealed synchronously,
 *    so they paint with the first contentful paint and never transition.
 *    Fading in content that was visible the moment the page opened is an odd
 *    experience anyway — there is no scroll for it to reward — and it was the
 *    last thing holding LCP above FCP.
 *  - **Below the fold** → handed to an IntersectionObserver and animated on
 *    the way in, which is the actual point of the feature.
 *
 * The rect reads are batched into one pass before any attribute is written, so
 * this costs a single forced layout rather than one per element.
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
var o=null,initial=true;
function reveal(n){n.setAttribute("data-visible","")}
function revealAll(n){for(var i=0;i<n.length;i++)reveal(n[i])}
function scan(){
var n=document.querySelectorAll("[data-reveal]:not([data-visible])"),i;
if(!n.length)return;
try{
if(window.matchMedia("(prefers-reduced-motion: reduce)").matches||!("IntersectionObserver" in window)){revealAll(n);initial=false;return}
}catch(e){revealAll(n);initial=false;return}
if(!o)o=new IntersectionObserver(function(es){
for(var j=0;j<es.length;j++){
if(!es[j].isIntersecting)continue;
reveal(es[j].target);
o.unobserve(es[j].target);
}
},{rootMargin:"0px 0px -8% 0px",threshold:0});
if(initial){
var h=window.innerHeight||0,onscreen=[];
for(i=0;i<n.length;i++)onscreen.push(n[i].getBoundingClientRect().top<h);
for(i=0;i<n.length;i++){
if(onscreen[i]){n[i].setAttribute("data-instant","");reveal(n[i])}
else o.observe(n[i]);
}
initial=false;
return;
}
for(i=0;i<n.length;i++)o.observe(n[i]);
}
window.__ctcReveal=scan;
scan();
})();`;
