// Configuration
const ITEMS_PER_PAGE = 6;
let currentPage = 1;
let currentPosts = [...blogPosts]; // Copy of data for filtering

// DOM Elements
const blogGrid = document.getElementById('blog-grid');
const searchInput = document.getElementById('search-input');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageInfo = document.getElementById('page-info');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderPosts();
    updatePaginationControls();

    // Search Listener
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        currentPosts = blogPosts.filter(post =>
            post.title.toLowerCase().includes(searchTerm) ||
            post.preview.toLowerCase().includes(searchTerm)
        );
        currentPage = 1; // Reset to first page on search
        renderPosts();
        updatePaginationControls();
    });

    // Pagination Listeners
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderPosts();
            updatePaginationControls();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    nextBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(currentPosts.length / ITEMS_PER_PAGE);
        if (currentPage < totalPages) {
            currentPage++;
            renderPosts();
            updatePaginationControls();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
});

function renderPosts() {
    blogGrid.innerHTML = '';

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const paginatedPosts = currentPosts.slice(start, end);

    if (paginatedPosts.length === 0) {
        blogGrid.innerHTML = '<p style="text-align:center; grid-column: 1/-1; color: var(--text-secondary);">No posts found.</p>';
        return;
    }

    paginatedPosts.forEach(post => {
        const card = document.createElement('a');
        card.href = post.url;
        card.className = 'blog-card';
        card.innerHTML = `
            <div class="blog-date">${post.date}</div>
            <h3 class="blog-title">${post.title}</h3>
            <p class="blog-preview">${post.preview}</p>
            <div class="read-more">Read Article</div>
        `;
        blogGrid.appendChild(card);
    });
}

function updatePaginationControls() {
    const totalPages = Math.ceil(currentPosts.length / ITEMS_PER_PAGE);

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;

    if (totalPages === 0) {
        pageInfo.textContent = 'Page 0 of 0';
    } else {
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    }
}
