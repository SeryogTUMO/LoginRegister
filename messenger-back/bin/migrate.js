import {Users} from '../models'

async function main() {
    for (const Model of [
        Users
    ]) {
        await Model.sync({alter: true})
    }
    process.exit(0)
}

main().catch(console.error)
