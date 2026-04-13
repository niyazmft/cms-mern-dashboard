/**
 * Benchmark script to demonstrate the performance difference between
 * N+1 queries and an optimized single query.
 *
 * This version simulates database server processing time, where multiple
 * concurrent requests still need to be processed by the database.
 */

const NETWORK_LATENCY_MS = 10;
const DB_PROCESSING_PER_QUERY_MS = 5;

// Simple simulation of a database server with a processing queue
let dbQueue = Promise.resolve();
const simulateDbServer = async (numItemsInQuery) => {
    // Network latency happens first (concurrently for all requests)
    await new Promise(resolve => setTimeout(resolve, NETWORK_LATENCY_MS));

    // DB processing happens in a queue
    return new Promise((resolve) => {
        dbQueue = dbQueue.then(() => {
            // Single query with N items is faster than N queries with 1 item
            // due to overhead reduction (parsing, indexing, etc.)
            const processingTime = numItemsInQuery === 1
                ? DB_PROCESSING_PER_QUERY_MS
                : DB_PROCESSING_PER_QUERY_MS + (numItemsInQuery * 0.5);

            return new Promise(r => setTimeout(r, processingTime));
        }).then(resolve);
    });
};

const nPlusOneApproach = async (ids) => {
    dbQueue = Promise.resolve(); // Reset queue for this run
    console.log(`Starting N+1 approach for ${ids.length} items...`);
    const start = Date.now();

    // Current code: await Promise.all(ids.map(id => Transaction.findById(id)))
    await Promise.all(
        ids.map(async (id) => {
            await simulateDbServer(1);
            return { _id: id, amount: Math.random() * 100 };
        })
    );

    const end = Date.now();
    console.log(`N+1 approach took: ${end - start}ms`);
    return end - start;
};

const optimizedApproach = async (ids) => {
    dbQueue = Promise.resolve(); // Reset queue for this run
    console.log(`Starting optimized approach for ${ids.length} items...`);
    const start = Date.now();

    // Optimized code: await Transaction.find({ _id: { $in: ids } })
    await simulateDbServer(ids.length);
    const results = ids.map(id => ({ _id: id, amount: Math.random() * 100 }));

    const end = Date.now();
    console.log(`Optimized approach took: ${end - start}ms`);
    return end - start;
};

const runBenchmark = async () => {
    const testCases = [1, 10, 28, 70];

    console.log("--- Performance Benchmark: N+1 vs Optimized Query (Simulated) ---");
    console.log(`Simulated Latency: ${NETWORK_LATENCY_MS}ms network + ~${DB_PROCESSING_PER_QUERY_MS}ms DB processing\n`);

    for (const numItems of testCases) {
        console.log(`Case: ${numItems} Transactions`);
        const ids = Array.from({ length: numItems }, (_, i) => `id_${i}`);

        const nPlusOneTime = await nPlusOneApproach(ids);
        const optimizedTime = await optimizedApproach(ids);

        const speedup = (nPlusOneTime / optimizedTime).toFixed(2);
        console.log(`Improvement: ${nPlusOneTime - optimizedTime}ms faster (~${speedup}x faster)`);
        console.log("--------------------------------------------------\n");
    }
};

runBenchmark().catch(err => console.error(err));
