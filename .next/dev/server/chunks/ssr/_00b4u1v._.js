module.exports = [
"[project]/components/product/product-card.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductCard",
    ()=>ProductCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-ssr] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-ssr] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$cart$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/cart-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$ui$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/ui-store.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function categoryLabel(category) {
    if (category === "moisturizers") return "moisturizer";
    if (category === "serums") return "serum";
    if (category === "cleansers") return "cleanser";
    if (category === "exfoliants") return "exfoliant";
    return category;
}
function ProductCard({ product }) {
    const addToCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$cart$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCartStore"])((s)=>s.addToCart);
    const setSelectedProduct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$ui$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUIStore"])((s)=>s.setSelectedProduct);
    const savedProductIds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$ui$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUIStore"])((s)=>s.savedProductIds);
    const toggleSaveProduct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$ui$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUIStore"])((s)=>s.toggleSaveProduct);
    const saved = savedProductIds.includes(product.id);
    // Determine if there is a NEW or BESTSELLER badge matching the reference
    const badgeText = product.id === "secrum-01" ? "NEW" : product.id === "secrum-03" ? "BESTSELLER" : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 30
        },
        whileInView: {
            opacity: 1,
            y: 0
        },
        viewport: {
            once: true,
            margin: "-50px"
        },
        transition: {
            duration: 0.6,
            ease: [
                0.16,
                1,
                0.3,
                1
            ]
        },
        className: "group flex flex-col h-full bg-white hover:bg-[#fcfcfa] rounded-[4px] overflow-hidden p-3 transition-all duration-500 hover:shadow-[0_15px_40px_rgba(74,74,74,0.04)] border border-transparent hover:border-[#e8e2d9]/40",
        id: `product-card-${product.id}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative overflow-hidden aspect-[4/5] bg-[#e8e2d9]/15 rounded-[3px] mb-4 cursor-pointer",
                onClick: ()=>setSelectedProduct(product),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        src: product.image || "/placeholder.svg",
                        alt: product.name,
                        fill: true,
                        sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
                        className: "object-cover object-center transform transition-transform duration-[1200ms] ease-out group-hover:scale-103"
                    }, void 0, false, {
                        fileName: "[project]/components/product/product-card.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-[#222222]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center space-x-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: (e)=>{
                                    e.stopPropagation();
                                    setSelectedProduct(product);
                                },
                                className: "p-3 bg-[#f5f5f0] hover:bg-[#222222] text-[#222222] hover:text-[#f5f5f0] rounded-[3px] transition-all duration-300 shadow-sm cursor-pointer",
                                title: "Inspect formula",
                                "aria-label": "Inspect formula",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/components/product/product-card.tsx",
                                    lineNumber: 66,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/product/product-card.tsx",
                                lineNumber: 57,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: (e)=>{
                                    e.stopPropagation();
                                    addToCart(product, 1);
                                },
                                className: "p-3 bg-[#222222] hover:bg-[#4a4a4a] text-[#f5f5f0] rounded-[3px] transition-all duration-300 shadow-sm cursor-pointer",
                                title: "Quick add to bag",
                                "aria-label": "Quick add to bag",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/components/product/product-card.tsx",
                                    lineNumber: 78,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/product/product-card.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/product/product-card.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    badgeText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-3 left-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[8px] font-sans font-bold tracking-[0.2em] bg-[#222222]/90 backdrop-blur-xs text-[#f5f5f0] py-1 px-2.5 uppercase rounded-xs shadow-xs",
                            children: badgeText
                        }, void 0, false, {
                            fileName: "[project]/components/product/product-card.tsx",
                            lineNumber: 85,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/product/product-card.tsx",
                        lineNumber: 84,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: (e)=>{
                            e.stopPropagation();
                            toggleSaveProduct(product.id);
                        },
                        "aria-label": saved ? "Remove from saved" : "Save product",
                        className: `absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-xs transition-colors duration-300 ${saved ? "bg-[#222222]/90 text-red-400" : "bg-[#f5f5f0]/80 text-[#4a4a4a] hover:bg-[#f5f5f0] hover:text-red-400"}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                            className: `w-3.5 h-3.5 ${saved ? "fill-current" : ""}`
                        }, void 0, false, {
                            fileName: "[project]/components/product/product-card.tsx",
                            lineNumber: 104,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/product/product-card.tsx",
                        lineNumber: 92,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-3 left-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-mono text-[8px] tracking-wider text-[#f5f5f0]/90 bg-[#222222]/40 backdrop-blur-xs py-0.5 px-2 rounded-xs",
                            children: product.volume
                        }, void 0, false, {
                            fileName: "[project]/components/product/product-card.tsx",
                            lineNumber: 109,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/product/product-card.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/product/product-card.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col flex-grow text-center px-2 pb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-sans text-[9px] font-semibold tracking-[0.2em] text-[#8c8c88] uppercase mb-1",
                        children: categoryLabel(product.category)
                    }, void 0, false, {
                        fileName: "[project]/components/product/product-card.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        onClick: ()=>setSelectedProduct(product),
                        className: "font-serif text-[17px] font-normal leading-snug text-[#222222] hover:text-[#4a4a4a] transition-colors duration-300 cursor-pointer mb-1 line-clamp-2 min-h-[44px] flex items-center justify-center",
                        children: product.name
                    }, void 0, false, {
                        fileName: "[project]/components/product/product-card.tsx",
                        lineNumber: 123,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center space-x-1 mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center text-[#ffc107]",
                                children: Array.from({
                                    length: 5
                                }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: `w-3 h-3 ${i < Math.floor(product.rating) ? "fill-current" : "text-gray-200"}`,
                                        viewBox: "0 0 20 20",
                                        fill: "currentColor",
                                        "aria-hidden": "true",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                        }, void 0, false, {
                                            fileName: "[project]/components/product/product-card.tsx",
                                            lineNumber: 141,
                                            columnNumber: 17
                                        }, this)
                                    }, i, false, {
                                        fileName: "[project]/components/product/product-card.tsx",
                                        lineNumber: 134,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/product/product-card.tsx",
                                lineNumber: 132,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-sans text-gray-500 font-light",
                                children: [
                                    "(",
                                    product.reviewsCount,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/product/product-card.tsx",
                                lineNumber: 145,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/product/product-card.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mt-auto pt-3 border-t border-[#e8e2d9]/50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-sans text-[13px] font-medium text-[#222222]",
                                children: [
                                    "$",
                                    product.price,
                                    ".00"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/product/product-card.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>addToCart(product, 1),
                                className: "text-[9px] font-sans font-bold tracking-[0.12em] text-[#222222] hover:text-[#4a4a4a] flex items-center space-x-1 uppercase focus:outline-none cursor-pointer group/btn",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "ADD TO BAG"
                                    }, void 0, false, {
                                        fileName: "[project]/components/product/product-card.tsx",
                                        lineNumber: 156,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "transform group-hover/btn:translate-x-0.5 transition-transform duration-300",
                                        children: "→"
                                    }, void 0, false, {
                                        fileName: "[project]/components/product/product-card.tsx",
                                        lineNumber: 157,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/product/product-card.tsx",
                                lineNumber: 152,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/product/product-card.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/product/product-card.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/product/product-card.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
}),
"[project]/lib/data.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BEST_DEALS",
    ()=>BEST_DEALS,
    "FAQS",
    ()=>FAQS,
    "NEW_ARRIVALS",
    ()=>NEW_ARRIVALS,
    "PRODUCTS",
    ()=>PRODUCTS,
    "TESTIMONIALS",
    ()=>TESTIMONIALS
]);
const PRODUCTS = [
    {
        id: "secrum-01",
        number: "N° 01",
        name: "Luminous Complexion Concentrate",
        tagline: "Hydrating Botanical Hyaluronic Complex",
        price: 84,
        category: "serums",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800",
        description: "An advanced humectant treatment distilled from mountain-grown rose petals, paired with triple-weight hyaluronic acid. Penetrates deeply to fortify the cellular lipid barrier, restoring bouncy resilience and a translucent, dewy glow.",
        ingredients: [
            "Pure Rose Damascena Distillate",
            "Sodium Hyaluronate (Multi-molecular weight)",
            "Organic Aloe Barbadensis Leaf Juice",
            "Centella Asiatica (Gotu Kola) Extract",
            "Vegetable Glycerin",
            "Provitamin B5 (Panthenol)"
        ],
        usage: "After cleansing and toning, press 3 to 4 drops gently into the damp face, neck, and décolletage. Follow with oils or moisture melts.",
        volume: "30 ml / 1.0 fl. oz",
        rating: 4.8,
        reviewsCount: 42,
        featured: true,
        skinConcerns: [
            "Hydration",
            "Glow Skin",
            "Brightening"
        ]
    },
    {
        id: "secrum-02",
        number: "N° 02",
        name: "Ceramide Barrier Recovery",
        tagline: "Rich Moisture-Lock Barrier Cream",
        price: 72,
        category: "moisturizers",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800",
        description: "A botanical lipid matrix that mirrors the skin's natural sebum. Combining ultra-lightweight sugarcane squalane with purifying alpine eucalyptus oil, it calms redness, purges environmental residue, and refines uneven textures.",
        ingredients: [
            "Sugarcane Squalane (99% pure)",
            "Cold-Pressed Simmondsia Chinensis (Jojoba) Oil",
            "Eucalyptus Globulus Leaf Oil",
            "Rosa Canina (Rosehip) Seed Oil",
            "Tocopherol (Vit E)",
            "Organic Rosemary Leaf Extract"
        ],
        usage: "Warm 2 drops in your palms and press firmly onto the skin as the final step of your evening ritual.",
        volume: "50 ml / 1.7 oz",
        rating: 4.9,
        reviewsCount: 108,
        featured: true,
        skinConcerns: [
            "Hydration",
            "Sensitive Skin",
            "Anti-Aging"
        ]
    },
    {
        id: "secrum-03",
        number: "N° 03",
        name: "Squalane & Rose Gold Infusion",
        tagline: "Active Lipid Recharging Infusion",
        price: 95,
        category: "moisturizers",
        image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=800",
        description: "Our award-winning whipped luxury butter. Marula and Kalahari Melon Seed lipids form a highly protective humectant mask that seals-in active nutrients during skin peak repair hours, smoothing fine lines by morning.",
        ingredients: [
            "Cold-Pressed Sclerocarya Birrea (Marula) Seed Oil",
            "Wild-Harvested Kalahari Melon Seed Lipids",
            "Organic Butyrospermum Parkii (Shea) Butter",
            "Ceramide NP",
            "Pomegranate Seed Concentrate",
            "Jasmine Officinale Flower Absolute"
        ],
        usage: "After serums, melt a pea-sized amount between your fingertips and massage in a slow upward motion.",
        volume: "30 ml / 1.0 fl. oz",
        rating: 4.9,
        reviewsCount: 215,
        featured: true,
        skinConcerns: [
            "Glow Skin",
            "Anti-Aging",
            "Dark Spots / Pigmentation"
        ]
    },
    {
        id: "secrum-04",
        number: "N° 04",
        name: "Gentle Molecular Cleansing Milk",
        tagline: "Soothing Botanical pH-Balanced Cleanser",
        price: 48,
        category: "cleansers",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800",
        description: "Sourced from glaciated Canadian fjords, this nutrient-dense marine silt pulls impurities while infusing over 60 rare minerals. Enriched with fine premium Matcha for powerful antioxidant protection and thermal skin cooling.",
        ingredients: [
            "Glacial Marine Clay/Silt",
            "Organic Camellia Sinensis (Matcha Green Tea) Powder",
            "Colloidal Oatmeal",
            "Kombu Seaweed Extract",
            "Allantoin",
            "Santalum Album (Sandalwood) Oil"
        ],
        usage: "Apply an even layer to clean skin. Relax for 10 minutes as it lightly sets. Rinse gently with warm water, using small circular motions.",
        volume: "150 ml / 5.1 fl. oz",
        rating: 4.7,
        reviewsCount: 56,
        featured: true,
        skinConcerns: [
            "Sensitive Skin",
            "Hydration",
            "Acne Care"
        ]
    },
    {
        id: "secrum-05",
        number: "N° 05",
        name: "Resurfacing Retinoid Overnight",
        tagline: "Active Treatment Formulated with Licorice Root",
        price: 98,
        category: "serums",
        image: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=800",
        description: "A silky hyper-targeted serum with 10% pure Niacinamide to dramatically reverse sun damage, age spots, and acne scarring. Licorice root and natural bearberry extract work synergetically to dissolve hyperpigmentation.",
        ingredients: [
            "Niacinamide (Vitamin B3 10%)",
            "Glycyrrhiza Glabra (Licorice) Root Extract",
            "Arctostaphylos Uva-Ursi (Bearberry) Extract",
            "Siberian Ginseng Root Oil",
            "Phytophid Cellular Water",
            "White Tea Leaf Extract"
        ],
        usage: "Apply 2-3 drops morning and evening before creams. Layer with sun protection in the morning.",
        volume: "30 ml / 1.0 fl. oz",
        rating: 4.6,
        reviewsCount: 12,
        featured: false,
        skinConcerns: [
            "Anti-Aging",
            "Dark Spots / Pigmentation",
            "Acne Care"
        ]
    },
    {
        id: "secrum-06",
        number: "N° 06",
        name: "Detoxifying Mineral Mud Mask",
        tagline: "Skin-Refining Tonic Distilled from High Swiss Flora",
        price: 58,
        category: "exfoliants",
        image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=800",
        description: "An astringent mineral mist crafted with fresh glacial runoff, steam-distilled Swiss alpine herbs, and prebiotics. Harmonizes the skin pH immediately, balances the biome, and tightens pores.",
        ingredients: [
            "Glacial Water Carrier",
            "Alpine Willowherb (Epilobium Fleischeri) Extract",
            "Inulin Prebiotics",
            "Siberian Fir Oil",
            "Calendula Officinalis Distillate",
            "Salicylic Acid (0.5% Willow Bark)"
        ],
        usage: "Mist generously over dry skin after cleansing, or mist throughout the day to recharge skin vitality.",
        volume: "100 ml / 3.4 oz",
        rating: 4.8,
        reviewsCount: 38,
        featured: false,
        skinConcerns: [
            "Acne Care",
            "Brightening",
            "Glow Skin"
        ]
    }
];
const TESTIMONIALS = [
    {
        id: "test-1",
        quote: "Secrum has transformed my approach to self-care. The textures feel completely bespoke, mimicking a high-end botanical sanctuary. No unnecessary fillers—just active, serene, glass-bottle beauty.",
        author: "Elena Rostov",
        role: "Editorial Director, L'Élément",
        rating: 5
    },
    {
        id: "test-2",
        quote: "The Rose Quartz Elixir coupled with the Balancing Oil is absolute morning magic. My chronic eczema has calmed down, and the radiant plumpness of my face is noticeable. The minimalism isn't just visual; the formulation is wonderfully clean.",
        author: "Julian Chen",
        role: "Architectural Designer, Studio Chen",
        rating: 5
    },
    {
        id: "test-3",
        quote: "The Glacial Marine Mud smells deeply of natural ceremonial tea leaves and grounding sandalwood. It's an ethereal scent that transports me away from high urban stress. Truly therapeutic apothecary work.",
        author: "Sophia Sterling",
        role: "Fine Art Curator, MOMA",
        rating: 5
    }
];
const FAQS = [
    {
        id: "faq-1",
        question: "How do the active botanicals remain shelf-stable without toxic preservatives?",
        answer: "We employ dynamic self-preserving natural hurdle systems, incorporating silver citrate, lactobacillus ferment, organic anise root extract, and airless twilight-violet glass vessels that shield light-sensitive nutrients."
    },
    {
        id: "faq-2",
        question: "Do you offer international shipping for your boutique apothecary bottles?",
        answer: "Yes, we ship worldwide with carbon-neutral parcel carriers. All items are packed in custom organic wood shavings and hand-pressed cotton linen satchels to prevent glass damage."
    },
    {
        id: "faq-3",
        question: "Are Secrum products safe for highly sensitive or hyper-reactive skin types?",
        answer: "Absolutely. We strictly formulate without artificial fragrances, parabens, sulfates, essential oil overrides, or synthetic essential lipids. We screen every batch in micro-clinical assays to ensure optimal dermal biocompatibility."
    },
    {
        id: "faq-4",
        question: "What is your ethical sourcing and organic verification philosophy?",
        answer: "We source our silts, clays, and high-altitude swiss mountain flora through fair-trade co-operatives that practice wildcrafted harvesting, ensuring zero land erosion and 100% trace-to-seed transparency."
    }
];
const NEW_ARRIVALS = [
    {
        id: "new-1",
        number: "N° 07",
        name: "3 Liquid Blush Bundle.",
        tagline: "Multi-use velvet emulsion tints for cheeks and lips",
        price: 30,
        category: "elixirs",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600",
        description: "An exclusive value set containing three fluid velvet blush formulas designed for perfect cheek warmth and lip flush integration. Contains organic squalane and rose extracts.",
        ingredients: [
            "Sugarcane Squalane",
            "Damask Rose extract",
            "Natural Earth pigments"
        ],
        usage: "Dab 1-2 drops onto warmth points of cheeks and blend outwards with fingers.",
        volume: "3 x 15 ml",
        rating: 4.8,
        reviewsCount: 24,
        skinConcerns: [
            "Glow Skin",
            "Hydration"
        ]
    },
    {
        id: "new-2",
        number: "N° 08",
        name: "texture signature bag",
        tagline: "Minimalist carry bag for serene storage",
        price: 2,
        category: "essences",
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600",
        description: "A custom, beautifully woven thick canvas gift pouch with a matching black grograin tie closure, optimized to stash your daily botanical formulas in complete darkness.",
        ingredients: [
            "100% Organic Canvas Cotton",
            "Eco-safe black dye ribbon"
        ],
        usage: "Tether with a single manual loop to shield sensitive light-absorbing elixirs.",
        volume: "Oversized",
        rating: 4.7,
        reviewsCount: 15,
        skinConcerns: [
            "Sensitive Skin"
        ]
    },
    {
        id: "new-3",
        number: "N° 09",
        name: "Bundle of Texture Corrector BB CREAM",
        tagline: "Skin-refining pigment shield duo",
        price: 38,
        category: "moisturizers",
        image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=600",
        description: "A special two-pack bundle of our mineral BB creams. Blurs pores and corrects redness while providing deep non-comedogenic moisture and UV reflection.",
        ingredients: [
            "Cellular Water",
            "Zinc Oxide",
            "Titanium Dioxide",
            "Hyaluronic Acid"
        ],
        usage: "Massage a dry pea-sized drop onto skin after serum, smoothing until fully fused.",
        volume: "2 x 30 ml",
        rating: 4.9,
        reviewsCount: 31,
        skinConcerns: [
            "Acne Care",
            "Dark Spots / Pigmentation",
            "Sensitive Skin"
        ]
    },
    {
        id: "new-4",
        number: "N° 10",
        name: "texture gloss.",
        tagline: "High-shine organic lipid glaze",
        price: 15,
        category: "oils",
        image: "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&q=80&w=600",
        description: "A pristine lip-nourishing lipid glide carrying concentrated cold-pressed rose hip seed oil and triple plant esters. Delivers rich reflective glow without being sticky.",
        ingredients: [
            "Rosehip Seed Oil",
            "Organic Castor Esters",
            "Vitamin E complex"
        ],
        usage: "Glide over naked lips or layer over velvet tints for instant glass volume.",
        volume: "10 ml",
        rating: 4.6,
        reviewsCount: 19,
        skinConcerns: [
            "Hydration",
            "Glow Skin"
        ]
    }
];
const BEST_DEALS = [
    {
        id: "deal-1",
        number: "N° 11",
        name: "Radiant Hydration Duo",
        tagline: "Concentrated serum & restorative moisture kit",
        price: 48,
        category: "serums",
        image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600",
        description: "A curated limited bundle featuring our active Botanical Saturated Elixir and recovery cream. Targets dry, depleted skin barriers for instant deep plumpness.",
        ingredients: [
            "Phytophil complexes",
            "Rose extract",
            "Shea tree lipid"
        ],
        usage: "Pat 2 drops of serum, wait thirty seconds, and seal with a generous layer of recovery cream.",
        volume: "2-Piece Set",
        rating: 4.9,
        reviewsCount: 42,
        skinConcerns: [
            "Hydration",
            "Sensitive Skin"
        ]
    },
    {
        id: "deal-2",
        number: "N° 12",
        name: "Squalane Glow Concentrate",
        tagline: "Sealed cellular lipid for high-shine look",
        price: 29,
        category: "oils",
        image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600",
        description: "An advanced lipid-replenisher that locks water in the dermis, giving an instant luminous glassy glow without leaving any surface heaviness.",
        ingredients: [
            "Sugarcane Squalane",
            "Silver Citrate"
        ],
        usage: "Add 2 drops to moist palms and massage onto face in circular motions.",
        volume: "30 ml / 1.0 fl. oz",
        rating: 4.8,
        reviewsCount: 18,
        skinConcerns: [
            "Glow Skin",
            "Hydration"
        ]
    },
    {
        id: "deal-3",
        number: "N° 13",
        name: "Glacial Clay Purifying Set",
        tagline: "Deep silt mask and soothing pore mist",
        price: 39,
        category: "essences",
        image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600",
        description: "A ceremonial dual set engineered to deeply refine skin texture, remove urban pollution metals, and lock in prebiotic hydration.",
        ingredients: [
            "Swiss Glacial Silt",
            "Charcoal",
            "Inulin prebiotics"
        ],
        usage: "Apply Clay for 10 minutes, rinse, and spray Alpine Tonic generously.",
        volume: "Set",
        rating: 4.7,
        reviewsCount: 22,
        skinConcerns: [
            "Acne Care",
            "Sensitive Skin"
        ]
    },
    {
        id: "deal-4",
        number: "N° 14",
        name: "Alpine Botanical Recovery Mist",
        tagline: "Instant therapeutic skin-barrier reload",
        price: 19,
        category: "essences",
        image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=600",
        description: "A micro-dispersal mist of Alpine willowherb, prebiotics, and floral distillate. Instant cooling, anti-inflammatory relief for irritated or sunburned skin.",
        ingredients: [
            "Glacial Runoff Water",
            "Prebiotics",
            "Alpine Willowherb"
        ],
        usage: "Mist face from 20cm away whenever redness or dryness occurs.",
        volume: "50 ml",
        rating: 4.8,
        reviewsCount: 14,
        skinConcerns: [
            "Sensitive Skin",
            "Hydration"
        ]
    }
];
}),
"[project]/app/shop/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ShopPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$vertical$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sliders$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sliders-vertical.js [app-ssr] (ecmascript) <export default as Sliders>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$product$2f$product$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/product/product-card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$shop$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/shop-store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
const CATEGORIES = [
    "cleansers",
    "serums",
    "moisturizers",
    "exfoliants",
    "elixirs",
    "oils",
    "clays",
    "essences"
];
const SKIN_CONCERNS = [
    "Hydration",
    "Glow Skin",
    "Brightening",
    "Sensitive Skin",
    "Anti-Aging",
    "Dark Spots / Pigmentation",
    "Acne Care"
];
function ShopPage() {
    const { searchQuery, selectedConcerns, selectedCategories, maxPrice, sortOrder, setSearchQuery, toggleConcern, toggleCategory, setMaxPrice, setSortOrder, resetFilters } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$shop$2d$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useShopStore"])();
    const [mobileFiltersOpen, setMobileFiltersOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const filteredProducts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        let result = [
            ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PRODUCTS"]
        ];
        if (searchQuery) {
            result = result.filter((p)=>p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.tagline.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        if (selectedCategories.length > 0) {
            result = result.filter((p)=>selectedCategories.includes(p.category));
        }
        if (selectedConcerns.length > 0) {
            result = result.filter((p)=>p.skinConcerns.some((concern)=>selectedConcerns.includes(concern)));
        }
        result = result.filter((p)=>p.price <= maxPrice);
        if (sortOrder === "price-asc") {
            result.sort((a, b)=>a.price - b.price);
        } else if (sortOrder === "price-desc") {
            result.sort((a, b)=>b.price - a.price);
        }
        return result;
    }, [
        searchQuery,
        selectedCategories,
        selectedConcerns,
        maxPrice,
        sortOrder
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-7xl mx-auto px-6 md:px-12 py-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 md:grid-cols-4 gap-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hidden md:block",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sticky top-24 space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-semibold text-[#222222] mb-3 text-sm uppercase tracking-wide",
                                        children: "Search"
                                    }, void 0, false, {
                                        fileName: "[project]/app/shop/page.tsx",
                                        lineNumber: 87,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Search products...",
                                        value: searchQuery,
                                        onChange: (e)=>setSearchQuery(e.target.value),
                                        className: "w-full px-3 py-2 border border-[#e8e2d9] rounded-sm text-sm focus:outline-none focus:border-[#222222]"
                                    }, void 0, false, {
                                        fileName: "[project]/app/shop/page.tsx",
                                        lineNumber: 88,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/shop/page.tsx",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-semibold text-[#222222] mb-3 text-sm uppercase tracking-wide",
                                        children: "Categories"
                                    }, void 0, false, {
                                        fileName: "[project]/app/shop/page.tsx",
                                        lineNumber: 98,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: CATEGORIES.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "flex items-center cursor-pointer group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        checked: selectedCategories.includes(cat),
                                                        onChange: ()=>toggleCategory(cat),
                                                        className: "w-4 h-4 border border-[#e8e2d9] rounded accent-[#222222] cursor-pointer"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/shop/page.tsx",
                                                        lineNumber: 102,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-2 text-xs text-[#4a4a4a] group-hover:text-[#222222] capitalize",
                                                        children: cat
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/shop/page.tsx",
                                                        lineNumber: 108,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, cat, true, {
                                                fileName: "[project]/app/shop/page.tsx",
                                                lineNumber: 101,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/shop/page.tsx",
                                        lineNumber: 99,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/shop/page.tsx",
                                lineNumber: 97,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-semibold text-[#222222] mb-3 text-sm uppercase tracking-wide",
                                        children: "Skin Concerns"
                                    }, void 0, false, {
                                        fileName: "[project]/app/shop/page.tsx",
                                        lineNumber: 117,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: SKIN_CONCERNS.map((concern)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "flex items-center cursor-pointer group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        checked: selectedConcerns.includes(concern),
                                                        onChange: ()=>toggleConcern(concern),
                                                        className: "w-4 h-4 border border-[#e8e2d9] rounded accent-[#222222] cursor-pointer"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/shop/page.tsx",
                                                        lineNumber: 121,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-2 text-xs text-[#4a4a4a] group-hover:text-[#222222]",
                                                        children: concern
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/shop/page.tsx",
                                                        lineNumber: 127,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, concern, true, {
                                                fileName: "[project]/app/shop/page.tsx",
                                                lineNumber: 120,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/shop/page.tsx",
                                        lineNumber: 118,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/shop/page.tsx",
                                lineNumber: 116,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-semibold text-[#222222] mb-3 text-sm uppercase tracking-wide",
                                        children: "Price Range"
                                    }, void 0, false, {
                                        fileName: "[project]/app/shop/page.tsx",
                                        lineNumber: 134,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "range",
                                        min: "0",
                                        max: "250",
                                        value: maxPrice,
                                        onChange: (e)=>setMaxPrice(Number(e.target.value)),
                                        className: "w-full cursor-pointer"
                                    }, void 0, false, {
                                        fileName: "[project]/app/shop/page.tsx",
                                        lineNumber: 135,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-[#4a4a4a] mt-2",
                                        children: [
                                            "Up to $",
                                            maxPrice
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/shop/page.tsx",
                                        lineNumber: 143,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/shop/page.tsx",
                                lineNumber: 133,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-semibold text-[#222222] mb-3 text-sm uppercase tracking-wide",
                                        children: "Sort"
                                    }, void 0, false, {
                                        fileName: "[project]/app/shop/page.tsx",
                                        lineNumber: 147,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: sortOrder,
                                        onChange: (e)=>setSortOrder(e.target.value),
                                        className: "w-full px-3 py-2 border border-[#e8e2d9] rounded-sm text-sm focus:outline-none focus:border-[#222222]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "default",
                                                children: "Default"
                                            }, void 0, false, {
                                                fileName: "[project]/app/shop/page.tsx",
                                                lineNumber: 153,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "price-asc",
                                                children: "Price: Low to High"
                                            }, void 0, false, {
                                                fileName: "[project]/app/shop/page.tsx",
                                                lineNumber: 154,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "price-desc",
                                                children: "Price: High to Low"
                                            }, void 0, false, {
                                                fileName: "[project]/app/shop/page.tsx",
                                                lineNumber: 155,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/shop/page.tsx",
                                        lineNumber: 148,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/shop/page.tsx",
                                lineNumber: 146,
                                columnNumber: 13
                            }, this),
                            (searchQuery || selectedCategories.length > 0 || selectedConcerns.length > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: resetFilters,
                                className: "w-full py-2 border border-charcoal text-[#222222] hover:bg-[#e8e2d9]/50 text-xs font-semibold rounded-sm transition-all duration-300 cursor-pointer",
                                children: "Reset Filters"
                            }, void 0, false, {
                                fileName: "[project]/app/shop/page.tsx",
                                lineNumber: 160,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/shop/page.tsx",
                        lineNumber: 85,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/shop/page.tsx",
                    lineNumber: 84,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "md:col-span-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "md:hidden mb-6 flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "font-serif text-2xl text-[#222222]",
                                    children: "Shop"
                                }, void 0, false, {
                                    fileName: "[project]/app/shop/page.tsx",
                                    lineNumber: 174,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setMobileFiltersOpen(!mobileFiltersOpen),
                                    className: "flex items-center space-x-2 px-4 py-2 border border-[#e8e2d9] rounded-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$vertical$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sliders$3e$__["Sliders"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/app/shop/page.tsx",
                                            lineNumber: 179,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-semibold",
                                            children: "Filters"
                                        }, void 0, false, {
                                            fileName: "[project]/app/shop/page.tsx",
                                            lineNumber: 180,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/shop/page.tsx",
                                    lineNumber: 175,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/shop/page.tsx",
                            lineNumber: 173,
                            columnNumber: 11
                        }, this),
                        mobileFiltersOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: -10
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            className: "md:hidden mb-6 p-4 bg-[#e8e2d9]/10 rounded-lg space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "Search...",
                                    value: searchQuery,
                                    onChange: (e)=>setSearchQuery(e.target.value),
                                    className: "w-full px-3 py-2 border border-[#e8e2d9] rounded-sm text-sm"
                                }, void 0, false, {
                                    fileName: "[project]/app/shop/page.tsx",
                                    lineNumber: 191,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    value: sortOrder,
                                    onChange: (e)=>setSortOrder(e.target.value),
                                    className: "w-full px-3 py-2 border border-[#e8e2d9] rounded-sm text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "default",
                                            children: "Sort: Default"
                                        }, void 0, false, {
                                            fileName: "[project]/app/shop/page.tsx",
                                            lineNumber: 203,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "price-asc",
                                            children: "Price: Low to High"
                                        }, void 0, false, {
                                            fileName: "[project]/app/shop/page.tsx",
                                            lineNumber: 204,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: "price-desc",
                                            children: "Price: High to Low"
                                        }, void 0, false, {
                                            fileName: "[project]/app/shop/page.tsx",
                                            lineNumber: 205,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/shop/page.tsx",
                                    lineNumber: 198,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: resetFilters,
                                    className: "w-full py-2 bg-[#222222] text-[#f5f5f0] text-xs font-semibold rounded-sm",
                                    children: "Reset"
                                }, void 0, false, {
                                    fileName: "[project]/app/shop/page.tsx",
                                    lineNumber: 207,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/shop/page.tsx",
                            lineNumber: 186,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "hidden md:block font-serif text-3xl text-[#222222] mb-2",
                                    children: "Shop"
                                }, void 0, false, {
                                    fileName: "[project]/app/shop/page.tsx",
                                    lineNumber: 218,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-[#4a4a4a]",
                                    children: [
                                        filteredProducts.length,
                                        " ",
                                        filteredProducts.length === 1 ? "product" : "products",
                                        " found"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/shop/page.tsx",
                                    lineNumber: 219,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/shop/page.tsx",
                            lineNumber: 217,
                            columnNumber: 11
                        }, this),
                        filteredProducts.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
                            children: filteredProducts.map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        y: 10
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    transition: {
                                        duration: 0.3
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$product$2f$product$2d$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ProductCard"], {
                                        product: product
                                    }, void 0, false, {
                                        fileName: "[project]/app/shop/page.tsx",
                                        lineNumber: 234,
                                        columnNumber: 19
                                    }, this)
                                }, product.id, false, {
                                    fileName: "[project]/app/shop/page.tsx",
                                    lineNumber: 228,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/shop/page.tsx",
                            lineNumber: 226,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-16",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-serif text-xl text-[#222222] mb-2",
                                    children: "No products found"
                                }, void 0, false, {
                                    fileName: "[project]/app/shop/page.tsx",
                                    lineNumber: 240,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-[#4a4a4a] mb-4",
                                    children: "Try adjusting your filters"
                                }, void 0, false, {
                                    fileName: "[project]/app/shop/page.tsx",
                                    lineNumber: 241,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: resetFilters,
                                    className: "inline-block bg-[#222222] hover:bg-[#4a4a4a] text-[#f5f5f0] px-6 py-2 rounded-sm text-xs font-semibold uppercase transition-all duration-300 cursor-pointer",
                                    children: "Reset Filters"
                                }, void 0, false, {
                                    fileName: "[project]/app/shop/page.tsx",
                                    lineNumber: 242,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/shop/page.tsx",
                            lineNumber: 239,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/shop/page.tsx",
                    lineNumber: 171,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/shop/page.tsx",
            lineNumber: 82,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/shop/page.tsx",
        lineNumber: 81,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_00b4u1v._.js.map