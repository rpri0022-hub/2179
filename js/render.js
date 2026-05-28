const CHARTS = [
 { id: 'chart-01', spec: 'charts/chart1.vg.json' },
 { id: 'chart-02', spec: 'charts/chart2.vg.json' },
 { id: 'chart-03', spec: 'charts/chart3.vg.json' },
 { id: 'chart-04', spec: 'charts/chart4.vg.json' },
 { id: 'chart-05', spec: 'charts/chart5.vg.json' },
 { id: 'chart-06', spec: 'charts/chart6.vg.json' },
 { id: 'chart-07', spec: 'charts/chart7.vg.json' },
 { id: 'chart-08', spec: 'charts/chart8.vg.json' },
 { id: 'chart-09', spec: 'charts/chart9.vg.json' },
 { id: 'chart-10', spec: 'charts/chart10.vg.json' },
 { id: 'chart-11', spec: 'charts/chart11.vg.json' },
 { id: 'chart-12', spec: 'charts/chart12.vg.json' },
];


const EMBED_OPTS = {
 actions: { export: true, source: true, compiled: false, editor: true },
 renderer: 'svg',
 config: {
   background: 'transparent',
   font: 'Inter Tight, sans-serif',
   title: {
     font: 'Fraunces, Georgia, serif',
     fontSize: 16,
     fontWeight: 500,
     anchor: 'start',
     color: '#1a1a1a'
   }
 }
};


async function renderAll() {
 for (const c of CHARTS) {
   const el = document.getElementById(c.id);
   if (!el) continue;
   try {
     const r = await fetch(c.spec);
     if (!r.ok) throw new Error(`HTTP ${r.status}`);
     const spec = await r.json();
     await vegaEmbed('#' + c.id, spec, EMBED_OPTS);
   } catch (e) {
     el.innerHTML = `<p style="padding:1rem;color:#c14a26;font-family:monospace;font-size:0.85rem">
       Chart failed to load: ${c.spec}<br/>${e.message}
     </p>`;
     console.error('Failed to load', c.spec, e);
   }
 }
}


if (document.readyState === 'loading') {
 document.addEventListener('DOMContentLoaded', renderAll);
} else {
 renderAll();
}



