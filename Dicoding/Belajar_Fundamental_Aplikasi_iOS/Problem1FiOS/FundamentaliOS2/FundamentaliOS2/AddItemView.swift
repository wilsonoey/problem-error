//
//  AddItemView.swift
//  FundamentaliOS2
//
//  Created by user247688 on 12/6/23.
//

import SwiftUI

struct AddItemView: View {
    @State private var itemName = ""
    @State private var itemPicture = ""
    @State private var itemDescription = ""
    @State private var itemAuthor = ""
    @State private var itemPublisher = ""

    var body: some View {
        NavigationView {
            Form {
                Section(header: Text("Item Details")) {
                    TextField("Name", text: $itemName)
                    TextField("URL Picture", text: $itemPicture)
                    TextField("Description", text: $itemDescription)
                    TextField("Author", text: $itemAuthor)
                    TextField("Publisher", text: $itemPublisher)
                }
                
                Section {
                    Button(action: {
                        let newBook = BookModel(
                            idbook: "UUID().uuidString",
                            picturebook: itemPicture,
                            namebook: itemName,
                            descriptionbook: itemDescription,
                            authorbook: itemAuthor,
                            publisherbook: itemPublisher,
                            iscompleted: 0,
                            isfavorite: 0,
                            createdat: "",
                            updatedat: ""
                        )
                        NetworkManager().addBook(bookData: newBook) { success in
                            if success {
                                print("Book added successfully")
                            } else {
                                print("Failed to add book")
                            }
                        }
                    }) {
                        Text("Add")
                    }
                }
            }
            .navigationTitle("Add Book Item")
        }
    }
}

struct AddItemView_Previews: PreviewProvider {
    static var previews: some View {
        AddItemView()
    }
}

