document.addEventListener('DOMContentLoaded', function () {
    getPosts().then(data => {
        allPosts = data; 
        renderPosts(allPosts); 
    });
});


document.getElementById('search').addEventListener('input', function () {
    const searchText = this.value.toLowerCase();

    const filteredPosts = allPosts.filter(post => {
        return post.title.toLowerCase().includes(searchText) || post.body.toLowerCase().includes(searchText);
    });

    renderPosts(filteredPosts, searchText);
});


async function getPosts() {
    try {
        const url = 'https://jsonplaceholder.typicode.com/posts';
        const response = await fetch(url);
        const posts = await response.json();
        const postsSplit = posts.slice(0, 10);
        return postsSplit;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }

}

function renderPosts(posts, searchText = '') {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const clone = renderPostComponent(post, searchText);
        postsContainer.appendChild(clone);
    });
}


function renderPostComponent(post, searchText = '') {
    const postComponent = document.getElementById('post-component');
    const clone = postComponent.content.cloneNode(true);

    const titlePost = clone.querySelector('.title-post');
    const bodyPost = clone.querySelector('.body-post');
    const idUser = clone.querySelector('.id-user');

    titlePost.innerHTML = highlightMatch(post.title, searchText);
    bodyPost.innerHTML = highlightMatch(post.body, searchText);
    idUser.innerHTML = `User ID: ${post.userId}`;

    return clone;
}


function highlightMatch(text, searchText) {
    if (!searchText) return text;

    const escapedSearch = searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedSearch})`, 'gi');

    return text.replace(regex, '<span class="highlight">$1</span>');
}
