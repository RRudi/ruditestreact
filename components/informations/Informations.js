import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import TempsRestant from './TempsRestant';
import TempsPriere from './TempsPriere';
import HeureProchainePriere from './HeureProchainePriere';

class Priere {
  Libelle;
  Horaire;
  Debut;
  Fin;
}

export default class Informations extends Component {

  urlApi = "https://api.aladhan.com/timingsByAddress/10-06-2020?address=Paris,France&midnightmode=1&method=99&methodSettings=17,null,14&tune=0,1,0,0,-1,3,3,-2,0,0";
  listePriereBloquee = ["Imsak", "Sunset", "Midnight"];

  constructor(props) {
    super(props);
    this.state = {
      listePriere: []
    }
  }


  componentDidMount() {

    axios.get(this.urlApi).then(reponse => {

        const horaires = reponse.data.data.timings;
        const listePriere = [];

        for (let element in horaires) 
        {
          if(!this.listePriereBloquee.includes(`${element}`))
          {
            const libelle = `${element}`;
            const horaire = `${horaires[element]}`;

            const nouvellePriere = new Priere();
            nouvellePriere.Libelle = libelle;
            nouvellePriere.Horaire = horaire;
            nouvellePriere.Debut = this.spliterHoraireEtGetTimestampUTC(horaire);
            nouvellePriere.Fin = "";

            listePriere.push(nouvellePriere);
          }
        }

        const horaireFajr = moment(listePriere.find( x => x.Libelle === 'Fajr').TimestampUTC);
        const horaireMaghib = moment(listePriere.find( x => x.Libelle === 'Maghrib').TimestampUTC);
        const horaireLimiteAsr = horaireMaghib.clone().subtract(30, 'm');
        const horaireFajrProchain = horaireFajr.clone().add(1, 'd');
        const differenceMinutes = horaireFajrProchain.diff(horaireMaghib, 'h', true);
        const horaireMidnight = horaireMaghib.clone().add(differenceMinutes/2, 'h');

        const nouvellePriere = new Priere();
        nouvellePriere.Libelle = "FajrProchain";
        nouvellePriere.Horaire = horaireFajrProchain.hours() + ':' + horaireFajrProchain.minute();
        nouvellePriere.Debut = horaireFajrProchain.format();
        nouvellePriere.Fin = "";
        listePriere.push(nouvellePriere);

        const nouvellePriere = new Priere();
        nouvellePriere.Libelle = "Midnight";
        nouvellePriere.Horaire = "horaire";
        nouvellePriere.Debut = horaireMidnight.format();
        nouvellePriere.Fin = "";
        listePriere.push(nouvellePriere);

        const nouvellePriere = new Priere();
        nouvellePriere.Libelle = "LimiteAsr";
        nouvellePriere.Horaire = horaireLimiteAsr.hours() + ':' + horaireLimiteAsr.minute();
        nouvellePriere.Debut = horaireLimiteAsr.format();
        nouvellePriere.Fin = "";
        listePriere.push(nouvellePriere);

        listePriere.sort((a, b) => moment(a.TimestampUTC) - moment(b.TimestampUTC))

        const priereActuelle = listePriere.find( x => moment(x.TimestampUTC) < moment())

        this.setState({ listePriere });
        console.log(this.state.listePriere);


      })
  }

  spliterHoraireEtGetTimestampUTC(horaire){

    const horaireSplit = horaire.split(':');
    const heure = horaireSplit[0];
    const minutes = horaireSplit[1];
    const nouvelleDate = moment().set({'hour': heure, 'minute': minutes});
    return nouvelleDate.format();
  }

  render() {
    return (
      <div className="p-3">
        <TempsPriere />
        <TempsRestant />
        <HeureProchainePriere />
        
        <br />
        { this.state.heureActuelle }
      </div>
    )
  }
}