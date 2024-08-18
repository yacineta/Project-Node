class ApiFeatures {
    constructor(mongooseQuery,queryString) {
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString  
    }
    filter() {
        const queryStringObj = {...this.queryString};
    const excludesFields = ['page','sort','limit','fileds'];
    excludesFields.forEach((field) => delete queryStringObj[field]);

    let queryStr = JSON.stringify(queryStringObj);
    queryStr = queryStr.replace(` `);
    this.mongooseQuery =  this.mongooseQuery.find(JSON.parse(queryStr));
    return this;
    }

    sort() {
        if(this.queryString.sort) {
            
            const  sortBy = req.query.sort.split(',').json(' ');
             
            this.mongooseQuery = this.mongooseQuery.sort(sortBy);
        }else {
            this.mongooseQuery = this.mongooseQuery.sort('-createAt');
        }
        return this;
    }

    limitFields (){
        if (this.queryString.fields) {
            const fields = req.query.fields.split(',').json(' ');
            this.mongooseQuery = this.mongooseQuery.select(fields);
            
        } else {
            this.mongooseQuery =  this.mongooseQuery.select('-__v');
        }
        return this;
    }

    search (modelName) {
        if (this.queryString.Keyword) {
            let query = {};
            if (modelName === 'Products') {
                 query.$or= [
                {title: {$regex: this.queryString.Keyword, $option: 'i'}},
                {description: {$regex: this.queryString.Keyword, $option: 'i'}}
            ];
            }else {
                query = {name: {$regex: this.queryString.Keyword, $option: 'i'}};

            }
           
            this.mongooseQuery = this.mongooseQuery.find(query);
    
        }
        return this;
    }
    paginate (countDocuments) {
        const page = req.query.page * 1 || 1 ;
        const limit = req.query.limit * 1 || 50 ;
        const skip = (page - 1) * limit;
        const endIndex = page * limit;

        const pagination = {};
        pagination.currentPage = page;
        pagination.limit = limit;
        pagination.numberOfPages = Math.ceil(countDocuments / limit) ;


        if (endIndex < countDocuments) {
            pagination.next = page + 1;
        }
        if (skip > 0) {
            pagination.prev = page -1;
            this.paginationResult = pagination;
        }
        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
        return this;
        
    }
}

module.exports =ApiFeatures;