// Global variables
let books = [];
let members = [];
let transactions = [];
let recentActivities = [];

// DOM elements
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');

// Dashboard elements
const totalBooksElement = document.getElementById('total-books');
const totalMembersElement = document.getElementById('total-members');
const booksBorrowedElement = document.getElementById('books-borrowed');
const booksAvailableElement = document.getElementById('books-available');
const currentDateElement = document.getElementById('current-date');
const recentActivitiesTable = document.getElementById('recent-activities-table').querySelector('tbody');

// Modal elements
const addBookBtn = document.getElementById('add-book-btn');
const addBookModal = document.getElementById('add-book-modal');
const addMemberBtn = document.getElementById('add-member-btn');
const addMemberModal = document.getElementById('add-member-modal');
const issueBookBtn = document.getElementById('issue-book-btn');
const issueBookModal = document.getElementById('issue-book-modal');
const bookDetailsModal = document.getElementById('book-details-modal');
const memberDetailsModal = document.getElementById('member-details-modal');
const closeBtns = document.querySelectorAll('.close');

// Search elements
const bookSearchInput = document.getElementById('book-search');
const bookSearchBtn = document.getElementById('book-search-btn');
const memberSearchInput = document.getElementById('member-search');
const memberSearchBtn = document.getElementById('member-search-btn');
const transactionFilter = document.getElementById('transaction-filter');
const transactionCountElement = document.getElementById('transaction-count');

// Form elements
const addBookForm = document.getElementById('add-book-form');
const addMemberForm = document.getElementById('add-member-form');
const issueBookForm = document.getElementById('issue-book-form');

// Tables
const booksTable = document.getElementById('books-table').querySelector('tbody');
const membersTable = document.getElementById('members-table').querySelector('tbody');
const transactionsTable = document.getElementById('transactions-table').querySelector('tbody');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Display current date
    updateCurrentDate();
    
    // Load data
    fetchBooks();
    fetchMembers();
    fetchTransactions();
    fetchRecentActivities();

    // Set up event listeners
    setupNavigation();
    setupModals();
    setupForms();
    setupSearch();
});

// Update current date
function updateCurrentDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateElement.textContent = now.toLocaleDateString('en-US', options);
}

// Data fetching functions
function fetchBooks() {
    // Simulate API fetch - In a real app, this would be an API call
    setTimeout(() => {
        books = [
            { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Fiction', status: 'Available', isbn: '9780061120084', published: 1960 },
            { id: 2, title: '1984', author: 'George Orwell', category: 'Fiction', status: 'Borrowed', isbn: '9780451524935', published: 1949 },
            { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', status: 'Available', isbn: '9780743273565', published: 1925 },
            { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', category: 'Fiction', status: 'Available', isbn: '9780141439518', published: 1813 },
            { id: 5, title: 'The Hobbit', author: 'J.R.R. Tolkien', category: 'Fiction', status: 'Borrowed', isbn: '9780547928227', published: 1937 },
            { id: 6, title: 'The Catcher in the Rye', author: 'J.D. Salinger', category: 'Fiction', status: 'Available', isbn: '9780316769488', published: 1951 },
            { id: 7, title: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari', category: 'Non-Fiction', status: 'Available', isbn: '9780062316097', published: 2011 }
        ];
        displayBooks();
        updateDashboardStats();
    }, 300);
}

function fetchMembers() {
    // Simulate API fetch
    setTimeout(() => {
        members = [
            { id: 1, name: 'John Doe', email: 'john@example.com', phone: '555-1234', address: '123 Main St, Anytown', booksBorrowed: 1 },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '555-5678', address: '456 Oak Ave, Somewhere', booksBorrowed: 1 },
            { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '555-9012', address: '789 Pine Rd, Nowhere', booksBorrowed: 0 },
            { id: 4, name: 'Alice Williams', email: 'alice@example.com', phone: '555-3456', address: '321 Elm St, Anywhere', booksBorrowed: 0 }
        ];
        displayMembers();
        updateDashboardStats();
    }, 300);
}

function fetchTransactions() {
    // Simulate API fetch
    setTimeout(() => {
        const today = new Date();
        const lastWeek = new Date(today);
        lastWeek.setDate(lastWeek.getDate() - 7);
        
        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);
        
        const twoWeeksAgo = new Date(today);
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
        
        transactions = [
            { 
                id: 1, 
                bookId: 2, 
                bookTitle: '1984', 
                memberId: 1, 
                memberName: 'John Doe', 
                issueDate: twoWeeksAgo.toISOString().split('T')[0],
                dueDate: lastWeek.toISOString().split('T')[0],
                returnDate: null, 
                status: 'Overdue' 
            },
            { 
                id: 2, 
                bookId: 5, 
                bookTitle: 'The Hobbit', 
                memberId: 2, 
                memberName: 'Jane Smith', 
                issueDate: lastWeek.toISOString().split('T')[0],
                dueDate: nextWeek.toISOString().split('T')[0],
                returnDate: null, 
                status: 'Borrowed' 
            },
            { 
                id: 3, 
                bookId: 4, 
                bookTitle: 'Pride and Prejudice', 
                memberId: 3, 
                memberName: 'Bob Johnson', 
                issueDate: twoWeeksAgo.toISOString().split('T')[0],
                dueDate: lastWeek.toISOString().split('T')[0],
                returnDate: lastWeek.toISOString().split('T')[0], 
                status: 'Returned' 
            }
        ];
        displayTransactions();
        updateTransactionCount();
        updateDashboardStats();
    }, 300);
}

function fetchRecentActivities() {
    // Simulate API fetch
    setTimeout(() => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        recentActivities = [
            { date: today.toISOString().split('T')[0], activity: 'Book Added', details: 'Added "Sapiens: A Brief History of Humankind" to the library' },
            { date: today.toISOString().split('T')[0], activity: 'Member Added', details: 'Added new member "Alice Williams"' },
            { date: yesterday.toISOString().split('T')[0], activity: 'Book Returned', details: '"Pride and Prejudice" returned by Bob Johnson' },
            { date: yesterday.toISOString().split('T')[0], activity: 'Book Issued', details: '"The Hobbit" issued to Jane Smith' }
        ];
        displayRecentActivities();
    }, 300);
}

function updateDashboardStats() {
    if (books.length > 0) {
        totalBooksElement.textContent = books.length;
        const availableBooks = books.filter(book => book.status === 'Available').length;
        booksAvailableElement.textContent = availableBooks;
        booksBorrowedElement.textContent = books.length - availableBooks;
    }
    
    if (members.length > 0) {
        totalMembersElement.textContent = members.length;
    }
}

function updateTransactionCount() {
    const filteredTransactions = getFilteredTransactions();
    transactionCountElement.textContent = `${filteredTransactions.length} transaction${filteredTransactions.length !== 1 ? 's' : ''}`;
}

function getFilteredTransactions() {
    const filterValue = transactionFilter.value;
    if (filterValue === 'all') {
        return transactions;
    }
    return transactions.filter(transaction => transaction.status.toLowerCase() === filterValue);
}

// Display functions
function displayBooks(filteredBooks = null) {
    const booksToDisplay = filteredBooks || books;
    booksTable.innerHTML = '';
    
    booksToDisplay.forEach(book => {
        const row = document.createElement('tr');
        
        const statusClass = book.status === 'Available' 
            ? 'status-available' 
            : book.status === 'Borrowed' 
                ? 'status-borrowed' 
                : 'status-overdue';
        
        row.innerHTML = `
            <td>${book.id}</td>
            <td><a href="#" class="book-details-link" data-id="${book.id}">${book.title}</a></td>
            <td>${book.author}</td>
            <td>${book.category}</td>
            <td><span class="status-badge ${statusClass}">${book.status}</span></td>
            <td>
                <button class="btn btn-primary view-book" data-id="${book.id}"><i class="fas fa-eye"></i></button>
                <button class="btn btn-danger delete-book" data-id="${book.id}"><i class="fas fa-trash"></i></button>
            </td>
        `;
        
        booksTable.appendChild(row);
    });
    
    // Add event listeners for book details
    document.querySelectorAll('.book-details-link, .view-book').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const bookId = parseInt(link.dataset.id);
            showBookDetails(bookId);
        });
    });
    
    // Add event listeners for delete buttons
    document.querySelectorAll('.delete-book').forEach(button => {
        button.addEventListener('click', () => {
            const bookId = parseInt(button.dataset.id);
            deleteBook(bookId);
        });
    });
}

function displayMembers(filteredMembers = null) {
    const membersToDisplay = filteredMembers || members;
    membersTable.innerHTML = '';
    
    membersToDisplay.forEach(member => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${member.id}</td>
            <td><a href="#" class="member-details-link" data-id="${member.id}">${member.name}</a></td>
            <td>${member.email}</td>
            <td>${member.phone}</td>
            <td>${member.booksBorrowed}</td>
            <td>
                <button class="btn btn-primary view-member" data-id="${member.id}"><i class="fas fa-eye"></i></button>
                <button class="btn btn-danger delete-member" data-id="${member.id}"><i class="fas fa-trash"></i></button>
            </td>
        `;
        
        membersTable.appendChild(row);
    });
    
    // Add event listeners for member details
    document.querySelectorAll('.member-details-link, .view-member').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const memberId = parseInt(link.dataset.id);
            showMemberDetails(memberId);
        });
    });
    
    // Add event listeners for delete buttons
    document.querySelectorAll('.delete-member').forEach(button => {
        button.addEventListener('click', () => {
            const memberId = parseInt(button.dataset.id);
            deleteMember(memberId);
        });
    });
}

function displayTransactions(filteredTransactions = null) {
    const transactionsToDisplay = filteredTransactions || getFilteredTransactions();
    transactionsTable.innerHTML = '';
    
    transactionsToDisplay.forEach(transaction => {
        const row = document.createElement('tr');
        
        const statusClass = transaction.status === 'Borrowed' 
            ? 'status-borrowed' 
            : transaction.status === 'Returned' 
                ? 'status-returned' 
                : 'status-overdue';
        
        row.innerHTML = `
            <td>${transaction.id}</td>
            <td>${transaction.bookTitle}</td>
            <td>${transaction.memberName}</td>
            <td>${formatDate(transaction.issueDate)}</td>
            <td>${formatDate(transaction.dueDate)}</td>
            <td>${transaction.returnDate ? formatDate(transaction.returnDate) : '-'}</td>
            <td><span class="status-badge ${statusClass}">${transaction.status}</span></td>
            <td>
                ${transaction.status !== 'Returned' 
                    ? `<button class="btn btn-success return-book" data-id="${transaction.id}"><i class="fas fa-undo"></i> Return</button>` 
                    : '-'
                }
            </td>
        `;
        
        transactionsTable.appendChild(row);
    });
    
    // Add event listeners for return buttons
    document.querySelectorAll('.return-book').forEach(button => {
        button.addEventListener('click', () => {
            const transactionId = parseInt(button.dataset.id);
            returnBook(transactionId);
        });
    });
}

function displayRecentActivities() {
    recentActivitiesTable.innerHTML = '';
    
    recentActivities.forEach(activity => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${formatDate(activity.date)}</td>
            <td>${activity.activity}</td>
            <td>${activity.details}</td>
        `;
        
        recentActivitiesTable.appendChild(row);
    });
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Navigation
function setupNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get the page to show from the data attribute
            const pageToShow = link.getAttribute('data-page');
            
            // Remove active class from all links and pages
            navLinks.forEach(l => l.classList.remove('active'));
            pages.forEach(p => p.classList.remove('active'));
            
            // Add active class to the clicked link and corresponding page
            link.classList.add('active');
            document.getElementById(pageToShow).classList.add('active');
        });
    });
}

// Modal functionality
function setupModals() {
    // Show modals
    addBookBtn.addEventListener('click', () => {
        addBookModal.style.display = 'block';
        setTimeout(() => addBookModal.classList.add('active'), 10);
    });
    
    addMemberBtn.addEventListener('click', () => {
        addMemberModal.style.display = 'block';
        setTimeout(() => addMemberModal.classList.add('active'), 10);
    });
    
    issueBookBtn.addEventListener('click', () => {
        issueBookModal.style.display = 'block';
        populateIssueBookForm();
        setTimeout(() => issueBookModal.classList.add('active'), 10);
        
        // Set default due date to 2 weeks from today
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14);
        document.getElementById('issue-due-date').value = dueDate.toISOString().split('T')[0];
    });
    
    // Close modals
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            modal.classList.remove('active');
            setTimeout(() => modal.style.display = 'none', 300);
        });
    });
    
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
            setTimeout(() => e.target.style.display = 'none', 300);
        }
    });
}

function showBookDetails(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;
    
    const bookDetailsContent = document.getElementById('book-details-content');
    
    // Find transactions for this book
    const bookTransactions = transactions.filter(t => t.bookId === bookId);
    
    bookDetailsContent.innerHTML = `
        <div class="details-container">
            <div class="details-row">
                <span class="details-label">Title:</span>
                <span class="details-value">${book.title}</span>
            </div>
            <div class="details-row">
                <span class="details-label">Author:</span>
                <span class="details-value">${book.author}</span>
            </div>
            <div class="details-row">
                <span class="details-label">Category:</span>
                <span class="details-value">${book.category}</span>
            </div>
            <div class="details-row">
                <span class="details-label">ISBN:</span>
                <span class="details-value">${book.isbn || 'N/A'}</span>
            </div>
            <div class="details-row">
                <span class="details-label">Published:</span>
                <span class="details-value">${book.published || 'N/A'}</span>
            </div>
            <div class="details-row">
                <span class="details-label">Status:</span>
                <span class="details-value status-badge ${book.status === 'Available' ? 'status-available' : 'status-borrowed'}">${book.status}</span>
            </div>
            
            ${bookTransactions.length > 0 ? `
                <h3 class="details-subtitle">Transaction History</h3>
                <div class="table-container">
                    <table class="details-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Member</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${bookTransactions.map(t => `
                                <tr>
                                    <td>${formatDate(t.issueDate)}</td>
                                    <td>${t.memberName}</td>
                                    <td><span class="status-badge ${
                                        t.status === 'Borrowed' ? 'status-borrowed' : 
                                        t.status === 'Returned' ? 'status-returned' : 
                                        'status-overdue'
                                    }">${t.status}</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            ` : '<p>No transaction history available.</p>'}
        </div>
    `;
    
    bookDetailsModal.style.display = 'block';
    setTimeout(() => bookDetailsModal.classList.add('active'), 10);
}

function showMemberDetails(memberId) {
    const member = members.find(m => m.id === memberId);
    if (!member) return;
    
    const memberDetailsContent = document.getElementById('member-details-content');
    
    // Find transactions for this member
    const memberTransactions = transactions.filter(t => t.memberId === memberId);
    
    memberDetailsContent.innerHTML = `
        <div class="details-container">
            <div class="details-row">
                <span class="details-label">Name:</span>
                <span class="details-value">${member.name}</span>
            </div>
            <div class="details-row">
                <span class="details-label">Email:</span>
                <span class="details-value">${member.email}</span>
            </div>
            <div class="details-row">
                <span class="details-label">Phone:</span>
                <span class="details-value">${member.phone}</span>
            </div>
            <div class="details-row">
                <span class="details-label">Address:</span>
                <span class="details-value">${member.address || 'N/A'}</span>
            </div>
            <div class="details-row">
                <span class="details-label">Books Borrowed:</span>
                <span class="details-value">${member.booksBorrowed}</span>
            </div>
            
            ${memberTransactions.length > 0 ? `
                <h3 class="details-subtitle">Borrowed Books</h3>
                <div class="table-container">
                    <table class="details-table">
                        <thead>
                            <tr>
                                <th>Book</th>
                                <th>Issue Date</th>
                                <th>Due Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${memberTransactions.map(t => `
                                <tr>
                                    <td>${t.bookTitle}</td>
                                    <td>${formatDate(t.issueDate)}</td>
                                    <td>${formatDate(t.dueDate)}</td>
                                    <td><span class="status-badge ${
                                        t.status === 'Borrowed' ? 'status-borrowed' : 
                                        t.status === 'Returned' ? 'status-returned' : 
                                        'status-overdue'
                                    }">${t.status}</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            ` : '<p>No books currently borrowed.</p>'}
        </div>
    `;
    
    memberDetailsModal.style.display = 'block';
    setTimeout(() => memberDetailsModal.classList.add('active'), 10);
}

function populateIssueBookForm() {
    const bookSelect = document.getElementById('issue-book-id');
    const memberSelect = document.getElementById('issue-member-id');
    
    // Clear previous options
    bookSelect.innerHTML = '<option value="">Select a book</option>';
    memberSelect.innerHTML = '<option value="">Select a member</option>';
    
    // Add available books
    const availableBooks = books.filter(book => book.status === 'Available');
    availableBooks.forEach(book => {
        const option = document.createElement('option');
        option.value = book.id;
        option.textContent = `${book.title} by ${book.author}`;
        bookSelect.appendChild(option);
    });
    
    // Add members
    members.forEach(member => {
        const option = document.createElement('option');
        option.value = member.id;
        option.textContent = `${member.name} (${member.email})`;
        memberSelect.appendChild(option);
    });
}

// Form submissions
function setupForms() {
    // Add book form
    addBookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newBook = {
            id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
            title: document.getElementById('book-title').value,
            author: document.getElementById('book-author').value,
            category: document.getElementById('book-category').value,
            isbn: document.getElementById('book-isbn').value,
            published: document.getElementById('book-published').value,
            status: 'Available'
        };
        
        books.push(newBook);
        displayBooks();
        updateDashboardStats();
        
        // Add to recent activities
        addRecentActivity(`Book Added`, `Added "${newBook.title}" to the library`);
        
        // Close modal
        addBookModal.classList.remove('active');
        setTimeout(() => addBookModal.style.display = 'none', 300);
        
        // Reset form
        addBookForm.reset();
    });
    
    // Add member form
    addMemberForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newMember = {
            id: members.length > 0 ? Math.max(...members.map(m => m.id)) + 1 : 1,
            name: document.getElementById('member-name').value,
            email: document.getElementById('member-email').value,
            phone: document.getElementById('member-phone').value,
            address: document.getElementById('member-address').value,
            booksBorrowed: 0
        };
        
        members.push(newMember);
        displayMembers();
        updateDashboardStats();
        
        // Add to recent activities
        addRecentActivity(`Member Added`, `Added new member "${newMember.name}"`);
        
        // Close modal
        addMemberModal.classList.remove('active');
        setTimeout(() => addMemberModal.style.display = 'none', 300);
        
        // Reset form
        addMemberForm.reset();
    });
    
    // Issue book form
    issueBookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const bookId = parseInt(document.getElementById('issue-book-id').value);
        const memberId = parseInt(document.getElementById('issue-member-id').value);
        const dueDate = document.getElementById('issue-due-date').value;
        
        const book = books.find(b => b.id === bookId);
        const member = members.find(m => m.id === memberId);
        
        if (!book || !member) return;
        
        // Update book status
        book.status = 'Borrowed';
        
        // Update member's borrowed count
        member.booksBorrowed += 1;
        
        // Create new transaction
        const newTransaction = {
            id: transactions.length > 0 ? Math.max(...transactions.map(t => t.id)) + 1 : 1,
            bookId: bookId,
            bookTitle: book.title,
            memberId: memberId,
            memberName: member.name,
            issueDate: new Date().toISOString().split('T')[0],
            dueDate: dueDate,
            returnDate: null,
            status: 'Borrowed'
        };
        
        transactions.push(newTransaction);
        
        // Update displays
        displayBooks();
        displayMembers();
        displayTransactions();
        updateTransactionCount();
        updateDashboardStats();
        
        // Add to recent activities
        addRecentActivity(`Book Issued`, `"${book.title}" issued to ${member.name}`);
        
        // Close modal
        issueBookModal.classList.remove('active');
        setTimeout(() => issueBookModal.style.display = 'none', 300);
        
        // Reset form
        issueBookForm.reset();
    });
}

// Search and filter functionality
function setupSearch() {
    // Book search
    bookSearchBtn.addEventListener('click', () => {
        const searchTerm = bookSearchInput.value.toLowerCase().trim();
        
        if (!searchTerm) {
            displayBooks();
            return;
        }
        
        const filteredBooks = books.filter(book =>
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm) ||
            book.category.toLowerCase().includes(searchTerm)
        );
        
        displayBooks(filteredBooks);
    });
    
    // Member search
    memberSearchBtn.addEventListener('click', () => {
        const searchTerm = memberSearchInput.value.toLowerCase().trim();
        
        if (!searchTerm) {
            displayMembers();
            return;
        }
        
        const filteredMembers = members.filter(member =>
            member.name.toLowerCase().includes(searchTerm) ||
            member.email.toLowerCase().includes(searchTerm) ||
            member.phone.includes(searchTerm)
        );
        
        displayMembers(filteredMembers);
    });
    
    // Enter key for search
    bookSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            bookSearchBtn.click();
        }
    });
    
    memberSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            memberSearchBtn.click();
        }
    });
    
    // Transaction filter
    transactionFilter.addEventListener('change', () => {
        displayTransactions();
        updateTransactionCount();
    });
}

// Action functions
function deleteBook(bookId) {
    const bookIndex = books.findIndex(book => book.id === bookId);
    if (bookIndex === -1) return;
    
    const book = books[bookIndex];
    
    // Check if book is currently borrowed
    if (book.status === 'Borrowed') {
        alert('Cannot delete a book that is currently borrowed');
        return;
    }
    
    // Remove the book
    books.splice(bookIndex, 1);
    displayBooks();
    updateDashboardStats();
    
    // Add to recent activities
    addRecentActivity(`Book Deleted`, `Removed "${book.title}" from the library`);
}

function deleteMember(memberId) {
    const memberIndex = members.findIndex(member => member.id === memberId);
    if (memberIndex === -1) return;
    
    const member = members[memberIndex];
    
    // Check if member has borrowed books
    if (member.booksBorrowed > 0) {
        alert('Cannot delete a member who has borrowed books');
        return;
    }
    
    // Remove the member
    members.splice(memberIndex, 1);
    displayMembers();
    updateDashboardStats();
    
    // Add to recent activities
    addRecentActivity(`Member Deleted`, `Removed "${member.name}" from the library`);
}

function returnBook(transactionId) {
    const transaction = transactions.find(t => t.id === transactionId);
    if (!transaction) return;
    
    // Update transaction
    transaction.returnDate = new Date().toISOString().split('T')[0];
    transaction.status = 'Returned';
    
    // Update book status
    const book = books.find(b => b.id === transaction.bookId);
    if (book) {
        book.status = 'Available';
    }
    
    // Update member's borrowed count
    const member = members.find(m => m.id === transaction.memberId);
    if (member) {
        member.booksBorrowed = Math.max(0, member.booksBorrowed - 1);
    }
    
    // Update displays
    displayBooks();
    displayMembers();
    displayTransactions();
    updateDashboardStats();
    
    // Add to recent activities
    addRecentActivity(`Book Returned`, `"${transaction.bookTitle}" returned by ${transaction.memberName}`);
}

function addRecentActivity(activity, details) {
    const newActivity = {
        date: new Date().toISOString().split('T')[0],
        activity: activity,
        details: details
    };
    
    recentActivities.unshift(newActivity);
    
    // Keep only the 10 most recent activities
    if (recentActivities.length > 10) {
        recentActivities.pop();
    }
    
    displayRecentActivities();
} 