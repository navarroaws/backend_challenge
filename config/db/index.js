class DB {
    constructor() {
        // lambda functions run and are stateless, so it won't work, it was just didactic...
        this.MemoryAdapter = new Map()
    }

    /**
     *
     * @param {String} collection
     * @param {Object} data
     * @returns {{success: boolean, rowAffected: number}}
     */
    create(collection, data) {
        const persisted =this.MemoryAdapter.get(collection)

        const lastId = this.MemoryAdapter.get(`${collection}-ids`) || 0
        const id = lastId + 1
        this.MemoryAdapter.set(`${collection}-ids`, id)
        Object.assign(data, {id})
        const newData = Array.isArray(data) ? [...persisted, data] : [data]
       this.MemoryAdapter.set(collection, newData)

        return {success: true, rowAffected: 1}
    }

    /**
     *
     * @param {String} collection
     * @returns {Array}
     */
    find(collection) {
        console.log(this.MemoryAdapter)
        return this.MemoryAdapter.get(collection)
    }

    //TODO: implemements
    delete() {

    }

}

module.exports = new DB()
