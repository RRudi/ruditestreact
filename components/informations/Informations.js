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
      listePriere: [],
      priereActuelle: '',
      fromNow: '',
      pourcentage: ''
    }
  }

  componentDidMount() {

    console.log('Informations componentDidMount');

    moment.updateLocale('fr', {
      relativeTime : {
          future: "dans %s",
          s  : 'dans quelques secondes',
          ss : '%d secondes',
          m:  "a minute",
          mm: "%d minutes",
          h:  "une heure",
          hh: "%d heurs"
      }
    });

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

        const horaireFajr = moment(listePriere.find( x => x.Libelle === 'Fajr').Debut);
        const horaireMaghib = moment(listePriere.find( x => x.Libelle === 'Maghrib').Debut);
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
        nouvellePriere.Fin = horaireFajrProchain.format();
        listePriere.push(nouvellePriere);

        const nouvellePriere = new Priere();
        nouvellePriere.Libelle = "LimiteAsr";
        nouvellePriere.Horaire = horaireLimiteAsr.hours() + ':' + horaireLimiteAsr.minute();
        nouvellePriere.Debut = horaireLimiteAsr.format();
        nouvellePriere.Fin = horaireMaghib.format();
        listePriere.push(nouvellePriere);

        listePriere.sort((a, b) => moment(a.Debut) - moment(b.Debut))

        const fajr = listePriere.find( x => x.Libelle === 'Fajr');
        const sunrise = listePriere.find( x => x.Libelle === 'Sunrise');
        const dhuhr = listePriere.find( x => x.Libelle === 'Dhuhr');
        const asr = listePriere.find( x => x.Libelle === 'Asr');
        const limiteAsr = listePriere.find( x => x.Libelle === 'LimiteAsr');
        const maghrib = listePriere.find( x => x.Libelle === 'Maghrib');
        const isha = listePriere.find( x => x.Libelle === 'Isha');
        const midnight = listePriere.find( x => x.Libelle === 'Midnight');

        fajr.Fin = sunrise.Debut;
        sunrise.Fin = dhuhr.Debut;
        dhuhr.Fin = asr.Debut;
        asr.Fin = limiteAsr.Debut;
        maghrib.Fin = isha.Debut;
        isha.Fin = midnight.Debut;

        const priereActuelle = listePriere.find( x => moment(x.Debut) < moment() && moment(x.Fin) > moment())

        const heureDebut = moment(priereActuelle.Debut);
        const heureFin = moment(priereActuelle.Fin);
        const tempsRestant = heureFin.diff(moment(), 'm', true);
        const periodeComplete = heureFin.diff(heureDebut, 'm', true);
        const pourcentage = tempsRestant/periodeComplete*100;
        const fromNow = heureFin.fromNow(true);

        console.log('-- TempsRestant : ', tempsRestant);
        console.log('-- PeriodeComplete : ', periodeComplete);
        console.log('-- Pourcentage : ', pourcentage + ' %');
        console.log(fromNow);

        this.setState({
          listePriere,
          priereActuelle,
          pourcentage,
          fromNow
        });
      })
  }

  spliterHoraireEtGetTimestampUTC(horaire){

    const horaireSplit = horaire.split(':');
    const heure = horaireSplit[0];
    const minutes = horaireSplit[1];
    const nouvelleDate = moment().set({'hour': heure, 'minute': minutes});
    return nouvelleDate.format();
  }

  componentDidUpdate(){

    console.log('Informations componentDidUpdate');
    console.log(this.state);
  }

  render() {
    return (
      <div className="p-3">
        <TempsPriere nomPriere = { this.state.priereActuelle.Libelle } />
        <TempsRestant fromNow = { this.state.fromNow }  />
        <HeureProchainePriere finPriere = { this.state.priereActuelle.Fin }  />
        <Pourcentage pourcentage = { this.state.pourcentage } />
      </div>
    )
  }
}