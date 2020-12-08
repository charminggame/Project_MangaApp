function test1() {
    var db = firebase.firestore();
    db.collection("manga").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var card = `"${doc.data().Name}"
                    `;
                    $("#tast").append(card);
                
            });
        })
}