/*
    Написать функцию для выполнения асинхронных запросов так,
    чтобы при неудачной попытке, запрос выполнялся 5 раз. Если все 5 неудачны -
    вывести лог с ошибками.
*/

async function fetchWithRetries(url: string, options: RequestInit = {}, retries: number = 5): Promise<Response | undefined> {
    const errors: Error[] = [];

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            return response;
        } catch (error) {
            if (error instanceof Error) {
                errors.push(error);
            }

            if (attempt === retries) {
                throw new AggregateError(errors, `Failed after ${retries} attempts`);
            }

            console.warn(`Attempt ${attempt} failed. Retrying...`);
        }
    }
}


//  const dataFetch = async () => {
//     try {
//         const response = await fetchWithRetries('SOME URL', { method: 'GET' });
//         const data = await response?.json();
//         console.log('Data received:', data);
//     } catch (error) {
//         console.error('All attempts failed:', error);
//     }
// };
//
// dataFetch().then(console.log);