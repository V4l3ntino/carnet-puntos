"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/(dashboard)/incidencias/page",{

/***/ "(app-pages-browser)/./api/incidenciasCrud.ts":
/*!********************************!*\
  !*** ./api/incidenciasCrud.ts ***!
  \********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   deleteIncidencia: () => (/* binding */ deleteIncidencia),\n/* harmony export */   getAllIncidencia: () => (/* binding */ getAllIncidencia),\n/* harmony export */   saveIncidencia: () => (/* binding */ saveIncidencia)\n/* harmony export */ });\nconst saveIncidencia = async (incidencia, creadores, alumnos, tipoIncidencias)=>{\n    try {\n        const CREADOR = creadores.find((item)=>item.user.profile.fullName == incidencia.creador);\n        const ALUMNO = alumnos.find((item)=>item.user.profile.fullName == incidencia.alumno);\n        const TIPO_INCIDENCIA = tipoIncidencias.find((item)=>item.descripcion == incidencia.tipoIncidencia);\n        const INCIDENCIA = {\n            user_id: CREADOR.user.id,\n            id: \"100\",\n            alumno_id: ALUMNO.idea,\n            descripcion: incidencia.descripcion,\n            tipoIncidencia: TIPO_INCIDENCIA.id\n        };\n        const result = await fetch('http://localhost:3000/api/incidencia', {\n            method: 'POST',\n            headers: {\n                'Content-Type': 'application/json'\n            },\n            body: JSON.stringify(INCIDENCIA)\n        });\n        if (!result.ok) {\n            const response = result.json();\n            alert(\"Algo ha salido mal intentalo de nuevo o m\\xe1s tarde \".concat(response.toString()));\n        }\n    } catch (error) {}\n};\nconst deleteIncidencia = ()=>{};\nconst getAllIncidencia = async ()=>{\n    try {\n        const result = await fetch('http://localhost:3000/api/incidencia');\n        if (result.ok != true) {\n            throw new Error();\n        }\n        return result.json();\n    } catch (error) {\n        throw error;\n    }\n};\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwaS9pbmNpZGVuY2lhc0NydWQudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRU8sTUFBTUEsaUJBQWlCLE9BQU1DLFlBQTZCQyxXQUF1QkMsU0FBbUJDO0lBQ3ZHLElBQUk7UUFDQSxNQUFNQyxVQUFnQ0gsVUFBVUksSUFBSSxDQUFDLENBQUNDLE9BQVNBLEtBQUtDLElBQUksQ0FBQ0MsT0FBTyxDQUFDQyxRQUFRLElBQUlULFdBQVdVLE9BQU87UUFDbkgsTUFBTUMsU0FBNkJULFFBQVFHLElBQUksQ0FBQyxDQUFDQyxPQUFTQSxLQUFLQyxJQUFJLENBQUNDLE9BQU8sQ0FBQ0MsUUFBUSxJQUFJVCxXQUFXWSxNQUFNO1FBQ3pHLE1BQU1DLGtCQUE4Q1YsZ0JBQWdCRSxJQUFJLENBQUMsQ0FBQ0MsT0FBU0EsS0FBS1EsV0FBVyxJQUFJZCxXQUFXZSxjQUFjO1FBRWhJLE1BQU1DLGFBQWE7WUFDZkMsU0FBU2IsUUFBU0csSUFBSSxDQUFDVyxFQUFFO1lBQ3pCQSxJQUFJO1lBQ0pDLFdBQVdSLE9BQVFTLElBQUk7WUFDdkJOLGFBQWFkLFdBQVdjLFdBQVc7WUFDbkNDLGdCQUFnQkYsZ0JBQWlCSyxFQUFFO1FBQ3ZDO1FBRUEsTUFBTUcsU0FBUyxNQUFNQyxNQUFNLHdDQUF3QztZQUMvREMsUUFBUTtZQUNSQyxTQUFTO2dCQUFDLGdCQUFnQjtZQUFrQjtZQUM1Q0MsTUFBTUMsS0FBS0MsU0FBUyxDQUFDWDtRQUN6QjtRQUVBLElBQUcsQ0FBQ0ssT0FBT08sRUFBRSxFQUFDO1lBQ1YsTUFBTUMsV0FBV1IsT0FBT1MsSUFBSTtZQUMvQkMsTUFBTSx3REFBMEUsT0FBcEJGLFNBQVNHLFFBQVE7UUFDOUU7SUFHQSxFQUFFLE9BQU9DLE9BQU8sQ0FFaEI7QUFDSixFQUFDO0FBRU0sTUFBTUMsbUJBQW1CLEtBRWhDLEVBQUM7QUFFTSxNQUFNQyxtQkFBbUI7SUFFNUIsSUFBSTtRQUNBLE1BQU1kLFNBQVMsTUFBTUMsTUFBTTtRQUUzQixJQUFHRCxPQUFPTyxFQUFFLElBQUksTUFBSztZQUNqQixNQUFNLElBQUlRO1FBQ2Q7UUFFQSxPQUFPZixPQUFPUyxJQUFJO0lBRXRCLEVBQUUsT0FBT0csT0FBTztRQUNaLE1BQU1BO0lBQ1Y7QUFFSixFQUFDIiwic291cmNlcyI6WyIvaG9tZS92YWxlbi9EZXNrdG9wL2Zyb250L2FwaS9pbmNpZGVuY2lhc0NydWQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWx1bW5vLCBJbmNpZGVuY2lhLCBJbmNpZGVuY2lhVGFibGUsIFByb2Zlc29yLCBUaXBvSW5jaWRlbmNpYSwgVXNlciB9IGZyb20gXCJAL2ludGVyZmFjZXMvaW50ZXJmYWNlc1wiXG5cbmV4cG9ydCBjb25zdCBzYXZlSW5jaWRlbmNpYSA9IGFzeW5jKGluY2lkZW5jaWE6IEluY2lkZW5jaWFUYWJsZSwgY3JlYWRvcmVzOiBQcm9mZXNvcltdLCBhbHVtbm9zOiBBbHVtbm9bXSwgdGlwb0luY2lkZW5jaWFzOiBUaXBvSW5jaWRlbmNpYVtdKTpQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBDUkVBRE9SOiBQcm9mZXNvciB8IHVuZGVmaW5lZCA9IGNyZWFkb3Jlcy5maW5kKChpdGVtKSA9PiBpdGVtLnVzZXIucHJvZmlsZS5mdWxsTmFtZSA9PSBpbmNpZGVuY2lhLmNyZWFkb3IpXG4gICAgY29uc3QgQUxVTU5POiBBbHVtbm8gfCB1bmRlZmluZWQgPSBhbHVtbm9zLmZpbmQoKGl0ZW0pID0+IGl0ZW0udXNlci5wcm9maWxlLmZ1bGxOYW1lID09IGluY2lkZW5jaWEuYWx1bW5vKVxuICAgIGNvbnN0IFRJUE9fSU5DSURFTkNJQTogVGlwb0luY2lkZW5jaWEgfCB1bmRlZmluZWQgPSB0aXBvSW5jaWRlbmNpYXMuZmluZCgoaXRlbSkgPT4gaXRlbS5kZXNjcmlwY2lvbiA9PSBpbmNpZGVuY2lhLnRpcG9JbmNpZGVuY2lhKVxuXG4gICAgY29uc3QgSU5DSURFTkNJQSA9IHtcbiAgICAgICAgdXNlcl9pZDogQ1JFQURPUiEudXNlci5pZCxcbiAgICAgICAgaWQ6IFwiMTAwXCIsXG4gICAgICAgIGFsdW1ub19pZDogQUxVTU5PIS5pZGVhLFxuICAgICAgICBkZXNjcmlwY2lvbjogaW5jaWRlbmNpYS5kZXNjcmlwY2lvbixcbiAgICAgICAgdGlwb0luY2lkZW5jaWE6IFRJUE9fSU5DSURFTkNJQSEuaWQsXG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZmV0Y2goJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hcGkvaW5jaWRlbmNpYScsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoSU5DSURFTkNJQSlcbiAgICB9KVxuXG4gICAgaWYoIXJlc3VsdC5vayl7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gcmVzdWx0Lmpzb24oKVxuICAgICBhbGVydChgQWxnbyBoYSBzYWxpZG8gbWFsIGludGVudGFsbyBkZSBudWV2byBvIG3DoXMgdGFyZGUgJHsgcmVzcG9uc2UudG9TdHJpbmcoKX1gKVxuICAgIH1cblxuICAgIFxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIFxuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGRlbGV0ZUluY2lkZW5jaWEgPSAoKTp2b2lkID0+IHtcblxufVxuXG5leHBvcnQgY29uc3QgZ2V0QWxsSW5jaWRlbmNpYSA9IGFzeW5jKCk6IFByb21pc2U8SW5jaWRlbmNpYVtdIHwgdW5kZWZpbmVkPiA9PiB7XG5cbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBmZXRjaCgnaHR0cDovL2xvY2FsaG9zdDozMDAwL2FwaS9pbmNpZGVuY2lhJylcblxuICAgICAgICBpZihyZXN1bHQub2sgIT0gdHJ1ZSl7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdC5qc29uKClcbiAgICBcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICB0aHJvdyBlcnJvciAgICAgICAgXG4gICAgfVxuXG59XG4iXSwibmFtZXMiOlsic2F2ZUluY2lkZW5jaWEiLCJpbmNpZGVuY2lhIiwiY3JlYWRvcmVzIiwiYWx1bW5vcyIsInRpcG9JbmNpZGVuY2lhcyIsIkNSRUFET1IiLCJmaW5kIiwiaXRlbSIsInVzZXIiLCJwcm9maWxlIiwiZnVsbE5hbWUiLCJjcmVhZG9yIiwiQUxVTU5PIiwiYWx1bW5vIiwiVElQT19JTkNJREVOQ0lBIiwiZGVzY3JpcGNpb24iLCJ0aXBvSW5jaWRlbmNpYSIsIklOQ0lERU5DSUEiLCJ1c2VyX2lkIiwiaWQiLCJhbHVtbm9faWQiLCJpZGVhIiwicmVzdWx0IiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJvayIsInJlc3BvbnNlIiwianNvbiIsImFsZXJ0IiwidG9TdHJpbmciLCJlcnJvciIsImRlbGV0ZUluY2lkZW5jaWEiLCJnZXRBbGxJbmNpZGVuY2lhIiwiRXJyb3IiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./api/incidenciasCrud.ts\n"));

/***/ })

});