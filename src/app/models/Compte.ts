export class Compte{
  nom: string;
  prenom: string;
  email: string;
  password: string;
  tel: string;

  constructor(nom: string, prenom: string, email: string, password: string, tel: string){
    this.nom=nom;
    this.prenom=prenom;
    this.email=email;
    this.password=password;
    this.tel=tel;
  }
}
