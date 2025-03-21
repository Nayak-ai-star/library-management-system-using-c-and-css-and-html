# Library Management System

A modern, professional web-based Library Management System for managing books, members, and lending transactions.

## Features

- **Dashboard** with key statistics and recent activities
- **Book Management** - Add, view, and manage your book collection
- **Member Management** - Track library members and their borrowing history
- **Transaction System** - Issue books, track returns, and monitor overdue items
- **Search & Filter** - Easily find books, members, and transactions
- **Responsive Design** - Works on desktop, tablet, and mobile devices

## Getting Started

### Running the Application

1. **Windows Users**: 
   - Simply double-click the `open_library.bat` file in the root directory
   - This will start a local web server and open the application in your default browser

2. **Manual Start**:
   - Navigate to the project directory in a terminal/command prompt
   - Start a web server in the project directory (e.g., `python -m http.server 8080`)
   - Open your browser and go to `http://localhost:8080/web/`

## Using the System

### Dashboard

The dashboard provides an overview of your library with:
- Total book count
- Member statistics
- Borrowed vs. available books
- Recent activity log

### Managing Books

1. Click on the "Books" tab in the navigation menu
2. Use the search box to find specific books
3. Click "Add New Book" to add a book to the library
4. Click the eye icon to view detailed information about a book
5. Click the trash icon to remove a book (only available if not borrowed)

### Managing Members

1. Click on the "Members" tab in the navigation menu
2. Use the search box to find specific members
3. Click "Add New Member" to register a new library member
4. Click the eye icon to view detailed information about a member
5. Click the trash icon to remove a member (only available if they have no borrowed books)

### Handling Transactions

1. Click on the "Transactions" tab in the navigation menu
2. Use the dropdown filter to view all, active, returned, or overdue transactions
3. Click "Issue Book" to lend a book to a member
4. Click the "Return" button to record a book return

## Technical Information

This Library Management System is a client-side application built with:

- HTML5
- CSS3 with responsive design principles
- JavaScript (vanilla)
- FontAwesome for icons
- Google Fonts for typography

In a production environment, this system would connect to a backend server for persistent data storage.

## License

This software is provided as-is, free to use for educational and demonstration purposes.

## Contact

For support or inquiries, please contact us at support@librarysystem.com 