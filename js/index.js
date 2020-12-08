$(function () {

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      displayName = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;

      $("#username").text(email);
      $("#displayname").text(displayName);
      $("#photo").attr("src", photoUrl);

    } else {
      window.location.href = 'signin.html';
    }
  });

  $("#signout").click(function () {
    firebase.auth().signOut()
      .then(function () {
        // Sign-out successful.
      }).catch(function (error) {
        // An error happened.
      });
  });
})

document.addEventListener('init', function (event) {
  var page = event.target;

  if (page.id === 'index') {
    page.querySelector('#profile').onclick = function () {
      document.querySelector('#Navispl').pushPage('view/profile.html');
    };

    page.querySelector('#home').onclick = function () {
      document.querySelector('#Navispl').pushPage('view/home.html');
    };

    page.querySelector('#search').onclick = function () {
      document.querySelector('#Navispl').pushPage('view/search.html');
    };
  }
  else if (page.id === 'home') {

  }

})

window.fn = {};

window.fn.toggleMenu = function () {
    document.getElementById('Navispl').right.toggle();
};

window.fn.loadView = function (index) {
    document.getElementById('appTabbar').setActiveTab(index);
    document.getElementById('menu').close();
};

window.fn.loadLink = function (url) {
    window.open(url, '_blank');
};

window.fn.pushPage = function (page, anim) {
    if (anim) {
        document.getElementById('Navispl').pushPage(page.id, { data: { title: page.title }, animation: anim });
    } else {
        document.getElementById('Navispl').pushPage(page.id, { data: { title: page.title } });
    }
};

function logo() {
  var db = firebase.firestore();
  db.collection("logo").get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              var card = ` <img src="${doc.data().link}" width="100%">`;
                  $("#logo").append(card);
              
          });
      })
}