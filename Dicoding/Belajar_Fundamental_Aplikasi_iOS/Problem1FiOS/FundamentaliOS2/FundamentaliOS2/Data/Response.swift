//
//  Response.swift
//  FundamentaliOS2
//
//  Created by user233987 on 3/30/23.
//

import Foundation

class NetworkManager {
    func addBook(bookData: BookModel, completion: @escaping (Bool) -> Void) {
        // Assuming you have an API endpoint for adding a new book
        let urlString = "\(mainUrl)book/add"
        guard let url = URL(string: urlString) else { return }
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        do {
            let encoder = JSONEncoder()
            let jsonData = try encoder.encode(bookData)
            print(jsonData)
            request.httpBody = jsonData
        } catch {
            print("Error encoding book data: \(error)")
            completion(false)
            return
        }
        
        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
            // Handle the response from the server, update completion accordingly
            // For example, you might check if the response indicates success or failure
            if let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 200 {
                completion(true)
            } else {
                completion(false)
            }
        }
        task.resume()
    }
    
    func getBooks(completion: @escaping (BookResponse?) -> Void) {
        let urlString = "\(mainUrl)books"
        guard let url = URL(string: urlString) else { return }
        let task = URLSession.shared.dataTask(with: url) { (data, response, error) in
            do {
                if let data = data {
                    let bookResponse = try JSONDecoder().decode(BookResponse.self, from: data)
                    completion(bookResponse)
                } else {
                    completion(nil)
                }
            } catch {
                print("Error decoding JSON: \(error)")
                completion(nil)
            }
        }
        task.resume()
    }
    
    func editBook(_ idbook: String, bookData: BookModel, completion: @escaping (Bool) -> Void) {
        // Assuming you have an API endpoint for adding a new book
        let urlString = "\(mainUrl)book/\(idbook)"
        guard let url = URL(string: urlString) else { return }
        
        var request = URLRequest(url: url)
        request.httpMethod = "PUT"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        do {
            let encoder = JSONEncoder()
            let jsonData = try encoder.encode(bookData)
            request.httpBody = jsonData
        } catch {
            print("Error encoding book data: \(error)")
            completion(false)
            return
        }
        
        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
            // Handle the response from the server, update completion accordingly
            // For example, you might check if the response indicates success or failure
            if let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 200 {
                completion(true)
            } else {
                completion(false)
            }
        }
        task.resume()
    }
    
    func deleteBook(_ idbook: String, completion: @escaping (Bool) -> Void) {
        // Assuming you have an API endpoint for deleting a book
        let urlString = "\(mainUrl)book/\(idbook)"
        guard let url = URL(string: urlString) else { return }
        
        var request = URLRequest(url: url)
        request.httpMethod = "DELETE"
        
        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
            // Handle the response from the server, update completion accordingly
            // For example, you might check if the response indicates success or failure
            if let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 200 {
                completion(true)
            } else {
                completion(false)
            }
        }
        
        task.resume()
    }
}
