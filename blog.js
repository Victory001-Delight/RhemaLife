document.addEventListener('DOMContentLoaded', function () {
    const search = document.getElementById('blogSearch');
    const sort = document.getElementById('blogSort');
    const grid = document.getElementById('articlesGrid');
    const items = Array.from(grid.querySelectorAll('.article-card'));

    function normalizeText(s) { return (s || '').toLowerCase(); }

    function filterAndRender() {
        const q = normalizeText(search.value);
        const sortVal = sort.value;

        let results = items.filter(item => {
            const title = normalizeText(item.dataset.title);
            const tags = normalizeText(item.dataset.tags || '');
            const body = normalizeText(item.textContent);
            return (title.indexOf(q) !== -1) || (tags.indexOf(q) !== -1) || (body.indexOf(q) !== -1);
        });

        results.sort((a, b) => {
            if (sortVal === 'newest') return new Date(b.dataset.date) - new Date(a.dataset.date);
            if (sortVal === 'oldest') return new Date(a.dataset.date) - new Date(b.dataset.date);
            if (sortVal === 'title-asc') return a.dataset.title.localeCompare(b.dataset.title);
            if (sortVal === 'title-desc') return b.dataset.title.localeCompare(a.dataset.title);
            return 0;
        });

        // clear grid and re-append
        grid.innerHTML = '';
        results.forEach(it => grid.appendChild(it));
    }

    search.addEventListener('input', () => filterAndRender());
    sort.addEventListener('change', () => filterAndRender());

    // initial render keeps defined order (newest default)
    filterAndRender();

    // simple intersection reveal for article cards (in case global observer doesn't include them)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('animated'); observer.unobserve(e.target); }
        });
    }, { rootMargin: '0px 0px -10% 0', threshold: 0.06 });
    items.forEach(i => observer.observe(i));
});
