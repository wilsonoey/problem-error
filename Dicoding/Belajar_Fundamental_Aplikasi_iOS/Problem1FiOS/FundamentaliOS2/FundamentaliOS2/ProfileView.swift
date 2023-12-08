//
//  ProfileView.swift
//  FundamentaliOS2
//
//  Created by user233987 on 3/30/23.
//

import SwiftUI

struct ProfileView: View {
    var body: some View {
        NavigationView{
            VStack{
                AsyncImage(
                    url: URL(string: "https://avatars.githubusercontent.com/u/61810752?v=4"),
                    content: {image in
                        image
                            .resizable()
                            .frame(maxWidth: 200, maxHeight: 200)
                    },
                    placeholder: {
                        ProgressView()
                    }
                )
                Text("Wilson Jonathan Oey")
            }
        }.navigationBarTitle(Text("About"), displayMode: .inline)
    }
}
 
struct ProfileView_Previews: PreviewProvider {
    static var previews: some View {
        ProfileView()
    }
}
