import { HEXACO_QUESTIONS, DOMAINS, FACETS } from './hexaco-data';

export type HexacoScores = {
    factors: Record<string, number>;
    facets: Record<string, number>;
};

export function calculateHexacoScores(answers: Record<number, number>): HexacoScores {
    const factorSums: Record<string, number[]> = {};
    const facetSums: Record<string, number[]> = {};

    // Initialize arrays
    Object.keys(DOMAINS).forEach(d => factorSums[d] = []);
    Object.values(FACETS).forEach(f => facetSums[f] = []);

    HEXACO_QUESTIONS.forEach(q => {
        const rawAnswer = answers[q.id];
        if (rawAnswer === undefined) return; // Skip unanswered (should be handled by UI validation)

        // Reverse scoring if needed
        // 1->5, 2->4, 3->3, 4->2, 5->1
        const score = q.reverse ? (6 - rawAnswer) : rawAnswer;

        // Add to factor
        if (factorSums[q.domain]) {
            factorSums[q.domain].push(score);
        }

        // Add to facet
        // We need to map the English facet name from data to Romanian name in FACETS
        const facetNameRO = FACETS[q.facet as keyof typeof FACETS];
        if (facetSums[facetNameRO]) {
            facetSums[facetNameRO].push(score);
        }
    });

    // Calculate averages
    const factors: Record<string, number> = {};
    const facets: Record<string, number> = {};

    Object.entries(factorSums).forEach(([domain, scores]) => {
        if (scores.length > 0) {
            const sum = scores.reduce((a, b) => a + b, 0);
            factors[domain] = Number((sum / scores.length).toFixed(2));
        } else {
            factors[domain] = 0;
        }
    });

    Object.entries(facetSums).forEach(([facet, scores]) => {
        if (scores.length > 0) {
            const sum = scores.reduce((a, b) => a + b, 0);
            facets[facet] = Number((sum / scores.length).toFixed(2));
        } else {
            facets[facet] = 0;
        }
    });

    return { factors, facets };
}
