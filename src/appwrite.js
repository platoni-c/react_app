import { Client, TablesDB, Query, ID } from "appwrite";

const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID
const tableId = import.meta.env.VITE_APPWRITE_TABLE_ID

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const tables = new TablesDB(client);

export const updateSearchCount = async (searchTerm, movie) => {
    try {
        // List rows where searchTerm equals the given term
        const list = await tables.listRows({
            databaseId,
            tableId,
            queries: [
                Query.equal("searchTerm", searchTerm)
            ]
        });

        if (list.rows.length > 0) {
            const row = list.rows[0];
            await tables.updateRow({
                databaseId,
                tableId,
                rowId: row.$id,
                data: {
                    count: row.count + 1
                },
                // include permissions if needed
            });
        } else {
            await tables.createRow({
                databaseId,
                tableId,
                rowId: ID.unique(),
                data: {
                    searchTerm,
                    count: 1,
                    movie_id: movie.id,
                    poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                },

            });
        }
    } catch (error) {
        console.error("Error updating search count:", error);
    }
}

export const getTrendingMovies = async () => {
    try {
        const result = await tables.listRows({
            databaseId,
            tableId,
            queries: [
                Query.limit(5),
                Query.orderDesc("count")
        ]
    })
    return result.rows;
    }
    catch (error) {
        console.error(error);
    }
}