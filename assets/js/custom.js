// Seletor de variantes (tamanho etc.) dos produtos
(function() {
  "use strict";

  function $(sel, ctx) {
    return (ctx || document).querySelector(sel)
  }

  function $$(sel, ctx) {
    return Array.from((ctx || document).querySelectorAll(sel))
  }

  function init() {
    $$(".variant-selector").forEach(initSelector)
  }

  function initSelector(container) {
    var productId = container.dataset.productId,
      jsonEl = document.getElementById("product-variants-json-" + productId);
    if (!jsonEl) return;
    var variants = JSON.parse(jsonEl.textContent),
      buttons = $$(".bvs-option-btn", container),
      hiddenSels = $$(".bvs-hidden-select", container);

    function getSelection() {
      var sel = {};
      return hiddenSels.forEach(function(s) {
        var pos = parseInt(s.id.replace("product-select-option-", ""), 10);
        sel[pos] = s.value
      }), sel
    }

    function findVariant(sel) {
      return variants.find(function(v) {
        return (!sel[1] || v.option1 === sel[1]) && (!sel[2] || v.option2 === sel[2]) && (!sel[3] || v.option3 === sel[3])
      }) || null
    }

    function isValueAvailableWithCurrentSelection(pos, val) {
      var sel = getSelection(),
        testSel = Object.assign({}, sel, {
          [pos]: val
        });
      return variants.some(function(v) {
        var match = !0;
        return Object.keys(testSel).forEach(function(p) {
          var key = "option" + p;
          v[key] !== testSel[p] && (match = !1)
        }), match && v.available
      })
    }

    function updateCartButton(available) {
      document.body.setAttribute("data-variant-available", available ? "true" : "false");
      var addBtns = $$('.Product_Item_Submit, [name="add"]', document);
      addBtns.forEach(function(btn) {
        btn._bvsOrigText || (btn._bvsOrigText = btn.textContent.trim()), available ? (btn.textContent = btn._bvsOrigText, btn.disabled = !1, btn.classList.remove("is-sold-out")) : (btn.textContent = "Sold Out", btn.disabled = !0, btn.classList.add("is-sold-out"))
      })
    }

    function refreshSwatchStates() {
      buttons.forEach(function(btn) {
        var pos = parseInt(btn.dataset.optionPosition, 10),
          val = btn.dataset.optionValue,
          avail = isValueAvailableWithCurrentSelection(pos, val);
        btn.classList.toggle("is-unavailable", !avail)
      });
      var currentVariant = findVariant(getSelection()),
        comboAvailable = currentVariant ? currentVariant.available : !1;
      updateCartButton(comboAvailable), currentVariant && container.dispatchEvent(new CustomEvent("variant:changed", {
        bubbles: !0,
        detail: {
          variant: currentVariant
        }
      }))
    }
    buttons.forEach(function(btn) {
      btn.addEventListener("click", function() {
        var optionName = btn.dataset.optionName,
          optionValue = btn.dataset.optionValue,
          pos = btn.dataset.optionPosition,
          group = btn.closest(".bvs-option-buttons");
        $$(".bvs-option-btn", group).forEach(function(s) {
          s.classList.remove("is-selected"), s.setAttribute("aria-pressed", "false")
        }), btn.classList.add("is-selected"), btn.setAttribute("aria-pressed", "true"), hiddenSels.forEach(function(sel) {
          sel.name === "options[" + optionName + "]" && (sel.value = optionValue, sel.dispatchEvent(new Event("change", {
            bubbles: !0
          })))
        }), refreshSwatchStates()
      })
    });

    function updateSavingsBadges() {
      var sel = getSelection();
      buttons.forEach(function(btn) {
        var pos = parseInt(btn.dataset.optionPosition, 10),
          val = btn.dataset.optionValue,
          testSel = Object.assign({}, sel, {
            [pos]: val
          }),
          v = findVariant(testSel),
          existing = btn.querySelector(".bvs-savings-badge");
        if (existing && existing.remove(), v && v.compare_at_price && v.compare_at_price > v.price) {
          var diff = v.compare_at_price - v.price,
            formatted = (diff / 100).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0
            }),
            badge = document.createElement("span");
          badge.className = "bvs-savings-badge", badge.textContent = (document.documentElement.lang.toLowerCase().startsWith("pt") ? "Economize " : "Save ") + formatted, btn.appendChild(badge)
        }
      })
    }
    refreshSwatchStates(), updateSavingsBadges()
  }
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", init) : init()
})();
