function read(Name) {
  console.log(Name)
  var db = firebase.firestore();
  db.collection("manga").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if(Name == doc.data().Name){
        for (let index = 0; index < doc.data().img.length; index++) {
          var card = `
        <img src="${doc.data().img[index]}" alt="" width="375px">`;
            $("#R").append(card);

          
        }
        
      }
      

    });
  })
}