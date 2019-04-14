const axios = require('axios');

class Portal{
    async getServices(addressId){

        const data = {
            adrid: addressId,
            common: false
        };

        const response = await axios.post(
            'https://rebild-sb.renoweb.dk/Legacy/JService.asmx/GetAffaldsplanMateriel_mitAffald',
            data
        ).catch((error) => {

        });

        const services = JSON.parse(response.data.d).list;

        const nextDayQueue = services.map(async (service) => {
            const list = await this.getId(service.id);

            return Promise.resolve({
                service: service.ordningnavn,
                days: list });
        });

        return Promise.all(nextDayQueue).then((list) => {
            return list;

        })


    }

    async getAddress(address){
        const data = {
            addresswithmateriel:3,
            searchterm:address
        };

        const response = await axios.post(
            'https://rebild-sb.renoweb.dk/Legacy/JService.asmx/Adresse_SearchByString',
            data
        ).catch((error) => {

            return;
        });
        return JSON.parse(response.data.d).list[0];

    }

    /**
     * Fetches the
     * @return {Promise.<void>}
     */
    async getId(materialId){
        const data = {materialid: materialId};
        console.log(data);
        const response = await axios.post(
            'https://rebild.renoweb.dk/Legacy/JService.asmx/GetCalender_mitAffald',
            data
        ).catch((error) => {
            console.log(error.message);
            console.log("something bad happened");
        });

        return JSON.parse(response.data.d).list;

    }
}

module.exports = Portal;