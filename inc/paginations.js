const s = require('connect-redis');
let conn = require('./db')


class Pagination {


    constructor(
        query,
        params = [],
        itensPerPage = 10) {

        this.query = query;
        this.params = params;
        this.itensPerPage = itensPerPage;
        this.currentPage = 1;

    }

    getPage(page){

        this.currentPage = page -1; 

         
        this.params.push(
            this.currentPage * this.itensPerPage,
            this.itensPerPage
        )

        return new Promise((resolve, reject)=>{
            conn.query([this.query, "SELECT FOUND_ROWS() AS FOUND_ROWS"].join(';'), this.params, (err, res)=>{
                if(err){
                    reject(err)
                }else{
                    this.data = res[0];
                    this.total = res[1][0].FOUND_ROWS,
                    this.total = Math.ceil(this.total / this.itensPerPage);
                    this.currentPage++;
                    resolve(this.data)
                }
            })});
    }

    getTotal(){
        return this.total
    }
    getCurrentPage(){
        return this.currentPage;
    }
    getTotalPages(){
        return this.totalPages
    }

}

module.exports = Pagination