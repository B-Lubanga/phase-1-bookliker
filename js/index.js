document.addEventListener('DOMContentLoaded', () => {
    const listElement = document.getElementById('list');
    const showPanel = document.getElementById('show-panel');
    const bookTitleElement = document.getElementById('book-title');
    const bookThumbnailElement = document.getElementById('book-thumbnail');
    const bookDescriptionElement = document.getElementById('book-description');
    const likeListElement = document.getElementById('like-list');
    const likeButton = document.getElementById('like-button');
  
    const currentUser = { id: 1, username: 'pouros' };  // Example of current user
  
    // Fetch the list of books
    fetch('http://localhost:3000/books')
      .then(response => response.json())
      .then(books => {
        // Populate the list of books
        books.forEach(book => {
          const li = document.createElement('li');
          li.textContent = book.title;
          li.addEventListener('click', () => showBookDetails(book));
          listElement.appendChild(li);
        });
      });
  
    // Show book details
    function showBookDetails(book) {
      // Populate the show-panel with the selected book's details
      bookTitleElement.textContent = book.title;
      bookThumbnailElement.src = book.thumbnail;
      bookDescriptionElement.textContent = book.description;
  
      // Clear previous likes
      likeListElement.innerHTML = '';
  
      // Display the list of users who like this book
      book.users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user.username;
        likeListElement.appendChild(li);
      });
  
      // Show the like button and add event listener
      likeButton.onclick = () => likeBook(book);
      
      // Show the details panel
      showPanel.style.display = 'block';
    }
  gi
    // Like a book
    function likeBook(book) {
      // Create the updated users array
      const updatedUsers = [...book.users, currentUser];
  
      // Prepare the PATCH request body
      const requestBody = {
        users: updatedUsers
      };
  
      // Send the PATCH request
      fetch(`http://localhost:3000/books/${book.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })
        .then(response => response.json())
        .then(updatedBook => {
          // Update the displayed list of users who liked the book
          likeListElement.innerHTML = '';
          updatedBook.users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = user.username;
            likeListElement.appendChild(li);
          });
        })
        .catch(error => {
          console.error('Error liking the book:', error);
        });
    }
  });
  