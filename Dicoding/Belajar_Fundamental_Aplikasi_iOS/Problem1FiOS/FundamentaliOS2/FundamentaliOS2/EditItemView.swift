//
//  EditItemView.swift
//  FundamentaliOS2
//
//  Created by user247688 on 12/6/23.
//

import SwiftUI

struct EditItemView: View {
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
                        
                        print("Item Name: \(itemName)")
                        print("Description: \(itemDescription)")
                        
                    }) {
                        Text("Edit")
                    }
                }
            }
            .navigationTitle("Edit Book Item")
        }
    }
}

struct EditItemView_Previews: PreviewProvider {
    static var previews: some View {
        EditItemView()
    }
}
