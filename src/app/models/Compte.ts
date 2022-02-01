export class Compte{
  nom: string;
  prenom: string;
  email: string;
  password: string;
  tel: string;
  imageUrl: string;

  constructor(nom: string, prenom: string, email: string, password: string, tel: string, imageUrl: string){
    this.nom=nom;
    this.prenom=prenom;
    this.email=email;
    this.password=password;
    this.tel=tel;
    this.imageUrl = imageUrl;
  }
}
