export class Contact{
  nom: string;
  prenom: string;
  email: string;
  tel: string;
  ville: string;
  adresse: string;
  service: string;


  constructor(nom: string,
              prenom: string,
              email: string,
              tel: string,
              ville: string,
              adresse: string,
              service: string)
 {
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.tel = tel;
    this.ville = ville;
    this.adresse = adresse;
    this.service = service;

  }
}
