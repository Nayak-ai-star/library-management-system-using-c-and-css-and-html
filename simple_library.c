#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

// Define structures
typedef struct {
    int id;
    char title[100];
    char author[100];
    char category[50];
    int available;
} Book;

typedef struct {
    int id;
    char name[100];
    char email[100];
    char phone[15];
} Member;

typedef struct {
    int id;
    int book_id;
    int member_id;
    char issue_date[20];
    char return_date[20];
    int returned;
} Transaction;

// Global arrays to store data (in-memory only for this simple version)
Book books[100];
Member members[50];
Transaction transactions[200];

// Counters
int book_count = 0;
int member_count = 0;
int transaction_count = 0;

// Function prototypes
void addBook();
void viewBooks();
void searchBooks();
void addMember();
void viewMembers();
void issueBook();
void returnBook();
void viewTransactions();
void displayMenu();

int main() {
    int choice;
    
    // Add some sample data
    // Sample books
    strcpy(books[0].title, "The Great Gatsby");
    strcpy(books[0].author, "F. Scott Fitzgerald");
    strcpy(books[0].category, "Classic");
    books[0].id = 1;
    books[0].available = 1;
    book_count++;
    
    strcpy(books[1].title, "To Kill a Mockingbird");
    strcpy(books[1].author, "Harper Lee");
    strcpy(books[1].category, "Classic");
    books[1].id = 2;
    books[1].available = 1;
    book_count++;
    
    strcpy(books[2].title, "1984");
    strcpy(books[2].author, "George Orwell");
    strcpy(books[2].category, "Dystopian");
    books[2].id = 3;
    books[2].available = 1;
    book_count++;
    
    // Sample members
    strcpy(members[0].name, "John Doe");
    strcpy(members[0].email, "john@example.com");
    strcpy(members[0].phone, "555-1234");
    members[0].id = 1;
    member_count++;
    
    strcpy(members[1].name, "Jane Smith");
    strcpy(members[1].email, "jane@example.com");
    strcpy(members[1].phone, "555-5678");
    members[1].id = 2;
    member_count++;
    
    printf("Simple Library Management System\n");
    printf("(In-memory version - no data will be saved)\n\n");
    
    while (1) {
        displayMenu();
        printf("Enter your choice: ");
        scanf("%d", &choice);
        
        switch (choice) {
            case 1:
                addBook();
                break;
            case 2:
                viewBooks();
                break;
            case 3:
                searchBooks();
                break;
            case 4:
                addMember();
                break;
            case 5:
                viewMembers();
                break;
            case 6:
                issueBook();
                break;
            case 7:
                returnBook();
                break;
            case 8:
                viewTransactions();
                break;
            case 9:
                printf("Exiting...\n");
                return 0;
            default:
                printf("Invalid choice. Please try again.\n");
        }
    }
    
    return 0;
}

// Add a new book
void addBook() {
    if (book_count >= 100) {
        printf("Error: Maximum book limit reached.\n");
        return;
    }
    
    Book newBook;
    
    newBook.id = book_count + 1;
    newBook.available = 1;
    
    printf("\n--- Add New Book ---\n");
    printf("Enter book title: ");
    getchar(); // Clear input buffer
    fgets(newBook.title, 100, stdin);
    newBook.title[strcspn(newBook.title, "\n")] = 0; // Remove newline
    
    printf("Enter author name: ");
    fgets(newBook.author, 100, stdin);
    newBook.author[strcspn(newBook.author, "\n")] = 0;
    
    printf("Enter category: ");
    fgets(newBook.category, 50, stdin);
    newBook.category[strcspn(newBook.category, "\n")] = 0;
    
    books[book_count++] = newBook;
    
    printf("Book added successfully with ID: %d\n", newBook.id);
}

// View all books
void viewBooks() {
    if (book_count == 0) {
        printf("No books available in the library.\n");
        return;
    }
    
    printf("\n--- Library Books ---\n");
    printf("%-5s %-30s %-20s %-15s %-10s\n", "ID", "Title", "Author", "Category", "Status");
    printf("-------------------------------------------------------------------------------------\n");
    
    for (int i = 0; i < book_count; i++) {
        printf("%-5d %-30s %-20s %-15s %-10s\n", 
               books[i].id, 
               books[i].title, 
               books[i].author, 
               books[i].category, 
               (books[i].available ? "Available" : "Issued"));
    }
}

// Search books by title or author
void searchBooks() {
    char searchTerm[100];
    int found = 0;
    
    printf("\n--- Search Books ---\n");
    printf("Enter title or author to search: ");
    getchar(); // Clear input buffer
    fgets(searchTerm, 100, stdin);
    searchTerm[strcspn(searchTerm, "\n")] = 0; // Remove newline
    
    printf("\nSearch Results:\n");
    printf("%-5s %-30s %-20s %-15s %-10s\n", "ID", "Title", "Author", "Category", "Status");
    printf("-------------------------------------------------------------------------------------\n");
    
    for (int i = 0; i < book_count; i++) {
        if (strstr(books[i].title, searchTerm) != NULL || strstr(books[i].author, searchTerm) != NULL) {
            printf("%-5d %-30s %-20s %-15s %-10s\n", 
                   books[i].id, 
                   books[i].title, 
                   books[i].author, 
                   books[i].category, 
                   (books[i].available ? "Available" : "Issued"));
            found = 1;
        }
    }
    
    if (!found) {
        printf("No matching books found.\n");
    }
}

// Add a new member
void addMember() {
    if (member_count >= 50) {
        printf("Error: Maximum member limit reached.\n");
        return;
    }
    
    Member newMember;
    
    newMember.id = member_count + 1;
    
    printf("\n--- Add New Member ---\n");
    printf("Enter member name: ");
    getchar(); // Clear input buffer
    fgets(newMember.name, 100, stdin);
    newMember.name[strcspn(newMember.name, "\n")] = 0; // Remove newline
    
    printf("Enter email: ");
    fgets(newMember.email, 100, stdin);
    newMember.email[strcspn(newMember.email, "\n")] = 0;
    
    printf("Enter phone number: ");
    fgets(newMember.phone, 15, stdin);
    newMember.phone[strcspn(newMember.phone, "\n")] = 0;
    
    members[member_count++] = newMember;
    
    printf("Member added successfully with ID: %d\n", newMember.id);
}

// View all members
void viewMembers() {
    if (member_count == 0) {
        printf("No members registered in the library.\n");
        return;
    }
    
    printf("\n--- Library Members ---\n");
    printf("%-5s %-20s %-30s %-15s\n", "ID", "Name", "Email", "Phone");
    printf("--------------------------------------------------------------------\n");
    
    for (int i = 0; i < member_count; i++) {
        printf("%-5d %-20s %-30s %-15s\n", 
               members[i].id, 
               members[i].name, 
               members[i].email, 
               members[i].phone);
    }
}

// Issue a book to a member
void issueBook() {
    int book_id, member_id;
    time_t t = time(NULL);
    struct tm *tm = localtime(&t);
    char date[20];
    
    strftime(date, sizeof(date), "%Y-%m-%d", tm);
    
    printf("\n--- Issue Book ---\n");
    
    // Display available books
    printf("\nAvailable Books:\n");
    printf("%-5s %-30s %-20s\n", "ID", "Title", "Author");
    printf("----------------------------------------------------------\n");
    
    for (int i = 0; i < book_count; i++) {
        if (books[i].available) {
            printf("%-5d %-30s %-20s\n", books[i].id, books[i].title, books[i].author);
        }
    }
    
    // Display members
    printf("\nMembers:\n");
    printf("%-5s %-20s\n", "ID", "Name");
    printf("-------------------------\n");
    
    for (int i = 0; i < member_count; i++) {
        printf("%-5d %-20s\n", members[i].id, members[i].name);
    }
    
    printf("\nEnter Book ID: ");
    scanf("%d", &book_id);
    
    printf("Enter Member ID: ");
    scanf("%d", &member_id);
    
    // Validate book ID
    int book_index = -1;
    for (int i = 0; i < book_count; i++) {
        if (books[i].id == book_id) {
            book_index = i;
            break;
        }
    }
    
    if (book_index == -1) {
        printf("Error: Book ID not found.\n");
        return;
    }
    
    if (!books[book_index].available) {
        printf("Error: Book is already issued.\n");
        return;
    }
    
    // Validate member ID
    int member_index = -1;
    for (int i = 0; i < member_count; i++) {
        if (members[i].id == member_id) {
            member_index = i;
            break;
        }
    }
    
    if (member_index == -1) {
        printf("Error: Member ID not found.\n");
        return;
    }
    
    // Create a new transaction
    Transaction newTransaction;
    
    newTransaction.id = transaction_count + 1;
    newTransaction.book_id = book_id;
    newTransaction.member_id = member_id;
    strcpy(newTransaction.issue_date, date);
    strcpy(newTransaction.return_date, "Not returned");
    newTransaction.returned = 0;
    
    transactions[transaction_count++] = newTransaction;
    
    // Update book availability
    books[book_index].available = 0;
    
    printf("Book issued successfully.\n");
}

// Return a book
void returnBook() {
    int transaction_id;
    time_t t = time(NULL);
    struct tm *tm = localtime(&t);
    char date[20];
    
    strftime(date, sizeof(date), "%Y-%m-%d", tm);
    
    printf("\n--- Return Book ---\n");
    
    // Display active transactions
    printf("\nActive Transactions:\n");
    printf("%-5s %-30s %-20s %-12s\n", "ID", "Book Title", "Issued To", "Issue Date");
    printf("------------------------------------------------------------------\n");
    
    for (int i = 0; i < transaction_count; i++) {
        if (!transactions[i].returned) {
            int book_index = -1;
            int member_index = -1;
            
            // Find book and member
            for (int j = 0; j < book_count; j++) {
                if (books[j].id == transactions[i].book_id) {
                    book_index = j;
                    break;
                }
            }
            
            for (int j = 0; j < member_count; j++) {
                if (members[j].id == transactions[i].member_id) {
                    member_index = j;
                    break;
                }
            }
            
            if (book_index != -1 && member_index != -1) {
                printf("%-5d %-30s %-20s %-12s\n", 
                       transactions[i].id, 
                       books[book_index].title, 
                       members[member_index].name, 
                       transactions[i].issue_date);
            }
        }
    }
    
    printf("\nEnter Transaction ID: ");
    scanf("%d", &transaction_id);
    
    // Find transaction
    int transaction_index = -1;
    for (int i = 0; i < transaction_count; i++) {
        if (transactions[i].id == transaction_id && !transactions[i].returned) {
            transaction_index = i;
            break;
        }
    }
    
    if (transaction_index == -1) {
        printf("Error: Transaction ID not found or already returned.\n");
        return;
    }
    
    // Update transaction
    transactions[transaction_index].returned = 1;
    strcpy(transactions[transaction_index].return_date, date);
    
    // Update book availability
    for (int i = 0; i < book_count; i++) {
        if (books[i].id == transactions[transaction_index].book_id) {
            books[i].available = 1;
            break;
        }
    }
    
    printf("Book returned successfully.\n");
}

// View all transactions
void viewTransactions() {
    if (transaction_count == 0) {
        printf("No transactions recorded.\n");
        return;
    }
    
    printf("\n--- Transaction History ---\n");
    printf("%-5s %-30s %-20s %-12s %-12s %-10s\n", 
           "ID", "Book Title", "Member Name", "Issue Date", "Return Date", "Status");
    printf("-------------------------------------------------------------------------------------\n");
    
    for (int i = 0; i < transaction_count; i++) {
        int book_index = -1;
        int member_index = -1;
        
        // Find book and member
        for (int j = 0; j < book_count; j++) {
            if (books[j].id == transactions[i].book_id) {
                book_index = j;
                break;
            }
        }
        
        for (int j = 0; j < member_count; j++) {
            if (members[j].id == transactions[i].member_id) {
                member_index = j;
                break;
            }
        }
        
        if (book_index != -1 && member_index != -1) {
            printf("%-5d %-30s %-20s %-12s %-12s %-10s\n", 
                   transactions[i].id, 
                   books[book_index].title, 
                   members[member_index].name, 
                   transactions[i].issue_date, 
                   transactions[i].return_date, 
                   (transactions[i].returned ? "Returned" : "Active"));
        }
    }
}

// Display the main menu
void displayMenu() {
    printf("\n======= Library Management System =======\n");
    printf("1. Add Book\n");
    printf("2. View Books\n");
    printf("3. Search Books\n");
    printf("4. Add Member\n");
    printf("5. View Members\n");
    printf("6. Issue Book\n");
    printf("7. Return Book\n");
    printf("8. View Transactions\n");
    printf("9. Exit\n");
    printf("=========================================\n");
} 