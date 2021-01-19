const filter = document.querySelector('.filter'),
  postContainer = document.querySelector('.posts-container'),
  loading = document.querySelector('.loading');

let limit = 5;
let page = 1;

async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const posts = res.json();
  return posts;
}

async function addPostToDom() {
  const posts = await getPosts();
  // console.log(posts);

  posts.forEach((post) => {
    const div = document.createElement('div');
    div.classList.add('post');
    div.innerHTML = `
    <h3 class="number">${post.id}</h3>
    <div class="post-info">
      <h2 class="post-title">${post.title}</h2>
      <p class="post-body">${post.body}</p>
    </div>
  `;
    postContainer.appendChild(div);
  });
}

function showMorePosts() {
  loading.classList.add('show');

  setTimeout(() => {
    loading.classList.remove('show');
    page++;
    setTimeout(() => {
      getPosts();
      addPostToDom();
    }, 300);
  }, 1000);
}
function filterPosts(e) {
  const term = e.target.value;
  const posts = document.querySelectorAll('.post');

  posts.forEach((post) => {
    const title = post.querySelector('.post-title').innerText;
    const body = post.querySelector('.post-body').innerText;
    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}
addPostToDom();

window.addEventListener('scroll', () => {
  let { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight) {
    showMorePosts();
    console.log('object');
  }
});

filter.addEventListener('input', filterPosts);
