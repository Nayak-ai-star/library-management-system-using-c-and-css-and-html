#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <winsock2.h>
#include <windows.h>
#include <ws2tcpip.h>

#pragma comment(lib, "ws2_32.lib")

#define PORT 8080
#define BUFFER_SIZE 4096
#define FILE_BUFFER_SIZE 65536

// Forward declarations
void handle_client(SOCKET client_socket);
void send_file(SOCKET client_socket, const char* path, const char* content_type);
char* get_content_type(const char* path);
void handle_api_request(SOCKET client_socket, char* request);
void send_json_response(SOCKET client_socket, const char* json);
void send_error(SOCKET client_socket, int status_code, const char* message);

// External functions from main.c
extern void loadData();
extern void saveData();
extern Book books[100];
extern int book_count;
extern Member members[50];
extern int member_count;
extern Transaction transactions[200];
extern int transaction_count;

int start_server() {
    WSADATA wsaData;
    SOCKET server_fd = INVALID_SOCKET;
    SOCKET client_socket = INVALID_SOCKET;
    struct sockaddr_in address;
    int addrlen = sizeof(address);
    
    // Initialize Winsock
    if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0) {
        printf("WSAStartup failed: %d\n", WSAGetLastError());
        return 1;
    }
    
    // Create socket
    if ((server_fd = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP)) == INVALID_SOCKET) {
        printf("Socket failed: %d\n", WSAGetLastError());
        WSACleanup();
        return 1;
    }
    
    // Set up server address
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(PORT);
    
    // Bind the socket
    if (bind(server_fd, (struct sockaddr *)&address, sizeof(address)) == SOCKET_ERROR) {
        printf("Bind failed: %d\n", WSAGetLastError());
        closesocket(server_fd);
        WSACleanup();
        return 1;
    }
    
    // Listen for connections
    if (listen(server_fd, 10) == SOCKET_ERROR) {
        printf("Listen failed: %d\n", WSAGetLastError());
        closesocket(server_fd);
        WSACleanup();
        return 1;
    }
    
    printf("Server started on port %d\n", PORT);
    
    // Load data from files
    loadData();
    
    // Accept and handle connections
    while (1) {
        if ((client_socket = accept(server_fd, (struct sockaddr *)&address, &addrlen)) == INVALID_SOCKET) {
            printf("Accept failed: %d\n", WSAGetLastError());
            continue;
        }
        
        // Create a new thread to handle the client
        HANDLE thread = CreateThread(NULL, 0, (LPTHREAD_START_ROUTINE)handle_client, (LPVOID)client_socket, 0, NULL);
        if (thread == NULL) {
            printf("Thread creation failed: %d\n", GetLastError());
            closesocket(client_socket);
        } else {
            CloseHandle(thread);
        }
    }
    
    // Cleanup
    closesocket(server_fd);
    WSACleanup();
    return 0;
}

void handle_client(SOCKET client_socket) {
    char buffer[BUFFER_SIZE] = {0};
    int bytes_read = recv(client_socket, buffer, BUFFER_SIZE, 0);
    
    if (bytes_read <= 0) {
        closesocket(client_socket);
        return;
    }
    
    char method[10], uri[255], version[10];
    sscanf(buffer, "%s %s %s", method, uri, version);
    
    // Handle API requests
    if (strncmp(uri, "/api/", 5) == 0) {
        handle_api_request(client_socket, buffer);
        closesocket(client_socket);
        return;
    }
    
    // Serve static files
    const char* web_root = "web";
    char file_path[512];
    
    // Default to index.html if root is requested
    if (strcmp(uri, "/") == 0) {
        strcpy(file_path, "web/index.html");
    } else {
        sprintf(file_path, "%s%s", web_root, uri);
    }
    
    // Get content type
    char* content_type = get_content_type(file_path);
    
    // Send the file
    send_file(client_socket, file_path, content_type);
    closesocket(client_socket);
}

void send_file(SOCKET client_socket, const char* path, const char* content_type) {
    FILE* file = fopen(path, "rb");
    
    if (file == NULL) {
        send_error(client_socket, 404, "Not Found");
        return;
    }
    
    // Get file size
    fseek(file, 0, SEEK_END);
    long file_size = ftell(file);
    fseek(file, 0, SEEK_SET);
    
    // Read file content
    char* file_content = (char*)malloc(file_size + 1);
    if (file_content == NULL) {
        fclose(file);
        send_error(client_socket, 500, "Internal Server Error");
        return;
    }
    
    size_t bytes_read = fread(file_content, 1, file_size, file);
    fclose(file);
    
    if (bytes_read != file_size) {
        free(file_content);
        send_error(client_socket, 500, "Internal Server Error");
        return;
    }
    
    // Null-terminate the string if it's text
    file_content[file_size] = '\0';
    
    // Prepare and send HTTP header
    char header[512];
    sprintf(header, 
            "HTTP/1.1 200 OK\r\n"
            "Content-Type: %s\r\n"
            "Content-Length: %ld\r\n"
            "Connection: close\r\n"
            "\r\n", 
            content_type, file_size);
    
    send(client_socket, header, strlen(header), 0);
    
    // Send file content
    send(client_socket, file_content, file_size, 0);
    
    free(file_content);
}

char* get_content_type(const char* path) {
    const char* ext = strrchr(path, '.');
    
    if (ext == NULL) {
        return "application/octet-stream";
    }
    
    if (strcmp(ext, ".html") == 0 || strcmp(ext, ".htm") == 0) {
        return "text/html";
    } else if (strcmp(ext, ".css") == 0) {
        return "text/css";
    } else if (strcmp(ext, ".js") == 0) {
        return "application/javascript";
    } else if (strcmp(ext, ".json") == 0) {
        return "application/json";
    } else if (strcmp(ext, ".png") == 0) {
        return "image/png";
    } else if (strcmp(ext, ".jpg") == 0 || strcmp(ext, ".jpeg") == 0) {
        return "image/jpeg";
    } else if (strcmp(ext, ".gif") == 0) {
        return "image/gif";
    } else if (strcmp(ext, ".svg") == 0) {
        return "image/svg+xml";
    } else if (strcmp(ext, ".ico") == 0) {
        return "image/x-icon";
    } else {
        return "application/octet-stream";
    }
}

void handle_api_request(SOCKET client_socket, char* request) {
    char* uri_start = strstr(request, " /api/");
    if (uri_start == NULL) {
        send_error(client_socket, 400, "Bad Request");
        return;
    }
    
    // Extract URI
    char uri[255];
    sscanf(uri_start, " %s", uri);
    
    // Handle different API endpoints
    if (strcmp(uri, "/api/books") == 0) {
        // Create JSON response with all books
        char* json = (char*)malloc(FILE_BUFFER_SIZE);
        if (json == NULL) {
            send_error(client_socket, 500, "Internal Server Error");
            return;
        }
        
        strcpy(json, "{\n  \"books\": [\n");
        
        for (int i = 0; i < book_count; i++) {
            char book_json[512];
            sprintf(book_json, 
                    "    {\n"
                    "      \"id\": %d,\n"
                    "      \"title\": \"%s\",\n"
                    "      \"author\": \"%s\",\n"
                    "      \"category\": \"%s\",\n"
                    "      \"available\": %s\n"
                    "    }%s\n",
                    books[i].id,
                    books[i].title,
                    books[i].author,
                    books[i].category,
                    books[i].available ? "true" : "false",
                    (i < book_count - 1) ? "," : "");
            
            strcat(json, book_json);
        }
        
        strcat(json, "  ]\n}");
        
        send_json_response(client_socket, json);
        free(json);
    } else if (strcmp(uri, "/api/members") == 0) {
        // Create JSON response with all members
        char* json = (char*)malloc(FILE_BUFFER_SIZE);
        if (json == NULL) {
            send_error(client_socket, 500, "Internal Server Error");
            return;
        }
        
        strcpy(json, "{\n  \"members\": [\n");
        
        for (int i = 0; i < member_count; i++) {
            char member_json[512];
            sprintf(member_json, 
                    "    {\n"
                    "      \"id\": %d,\n"
                    "      \"name\": \"%s\",\n"
                    "      \"email\": \"%s\",\n"
                    "      \"phone\": \"%s\"\n"
                    "    }%s\n",
                    members[i].id,
                    members[i].name,
                    members[i].email,
                    members[i].phone,
                    (i < member_count - 1) ? "," : "");
            
            strcat(json, member_json);
        }
        
        strcat(json, "  ]\n}");
        
        send_json_response(client_socket, json);
        free(json);
    } else if (strcmp(uri, "/api/transactions") == 0) {
        // Create JSON response with all transactions
        char* json = (char*)malloc(FILE_BUFFER_SIZE);
        if (json == NULL) {
            send_error(client_socket, 500, "Internal Server Error");
            return;
        }
        
        strcpy(json, "{\n  \"transactions\": [\n");
        
        for (int i = 0; i < transaction_count; i++) {
            // Find book and member
            int book_index = -1;
            int member_index = -1;
            
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
                char transaction_json[1024];
                sprintf(transaction_json, 
                        "    {\n"
                        "      \"id\": %d,\n"
                        "      \"book\": {\n"
                        "        \"id\": %d,\n"
                        "        \"title\": \"%s\"\n"
                        "      },\n"
                        "      \"member\": {\n"
                        "        \"id\": %d,\n"
                        "        \"name\": \"%s\"\n"
                        "      },\n"
                        "      \"issue_date\": \"%s\",\n"
                        "      \"return_date\": \"%s\",\n"
                        "      \"status\": \"%s\"\n"
                        "    }%s\n",
                        transactions[i].id,
                        books[book_index].id,
                        books[book_index].title,
                        members[member_index].id,
                        members[member_index].name,
                        transactions[i].issue_date,
                        transactions[i].return_date,
                        transactions[i].returned ? "Returned" : "Active",
                        (i < transaction_count - 1) ? "," : "");
                
                strcat(json, transaction_json);
            }
        }
        
        strcat(json, "  ]\n}");
        
        send_json_response(client_socket, json);
        free(json);
    } else {
        send_error(client_socket, 404, "API Endpoint Not Found");
    }
}

void send_json_response(SOCKET client_socket, const char* json) {
    char header[512];
    sprintf(header, 
            "HTTP/1.1 200 OK\r\n"
            "Content-Type: application/json\r\n"
            "Content-Length: %ld\r\n"
            "Connection: close\r\n"
            "\r\n", 
            strlen(json));
    
    send(client_socket, header, strlen(header), 0);
    send(client_socket, json, strlen(json), 0);
}

void send_error(SOCKET client_socket, int status_code, const char* message) {
    char header[512];
    char body[1024];
    
    sprintf(body, "<html><body><h1>%d %s</h1></body></html>", status_code, message);
    
    sprintf(header, 
            "HTTP/1.1 %d %s\r\n"
            "Content-Type: text/html\r\n"
            "Content-Length: %ld\r\n"
            "Connection: close\r\n"
            "\r\n", 
            status_code, message, strlen(body));
    
    send(client_socket, header, strlen(header), 0);
    send(client_socket, body, strlen(body), 0);
} 