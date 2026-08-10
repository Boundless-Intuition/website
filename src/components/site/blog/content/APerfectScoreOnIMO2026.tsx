import { P, H2, H3, DataTable, Figure, UL } from "../prose";
import { ImoTotalTimeChart, ImoTimeByProblemChart } from "../charts";

// Every number in this post comes from IMO-2026/BLOG.md. The two figures plot
// the same tables that follow them, so a reader who wants the exact minutes
// never has to read them off a bar.

function ExtLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-accent underline underline-offset-2"
    >
      {children}
    </a>
  );
}

export function APerfectScoreOnIMO2026() {
  return (
    <>
      <P>
        Scaling intelligence without scaling trust is a dangerous trajectory. At
        Boundless Intuition, we are building systems for verified intelligence
        to address this.
      </P>

      <P>
        That requires solving two problems at once. Verification must be
        rigorous enough to establish correctness and fast enough to be useful in
        the real world.
      </P>

      <P>
        Eventually, this approach must generalize. The same underlying reasoning
        system should be able to operate across mathematical theorems, tax
        rules, medical constraints, semiconductor specifications, security
        policies, and other domains. The formal representation and verification
        mechanism may differ, but the need for a checkable guarantee remains the
        same.
      </P>

      <P>
        The International Mathematical Olympiad is a useful stress test for that
        ambition. IMO 2026, held in Shanghai on 15&ndash;16 July 2026, is the
        most prestigious mathematics competition in the world, and its problems
        are hard in ways that expose the weaknesses of automated provers. We ran{" "}
        <strong>Dirac</strong>, our autonomous proving agent, on the publicly
        released formalizations of all six problems published by Axiom Maths and
        compared our results against other externally published provers on the
        same statements.
      </P>

      <P>
        <strong>Dirac proved all six.</strong>
      </P>

      <UL>
        <li>
          Official contest problems:{" "}
          <ExtLink href="https://www.imo-official.org/problems/2026/">
            imo-official.org/problems/2026
          </ExtLink>
        </li>
        <li>
          Our verified solutions:{" "}
          <ExtLink href="https://github.com/Boundless-Intuition/IMO2026">
            github.com/Boundless-Intuition/IMO2026
          </ExtLink>
        </li>
      </UL>

      <H2 id="the-result">The result</H2>

      <P>
        All three systems were run against the same formalizations. Total
        proving time across the six problems:
      </P>

      <Figure
        n={1}
        caption={
          <>
            Total time to prove all six problems. Dirac takes 7h 18m; the other
            publicly reported results on the same formalizations are shown
            alongside for reference.
          </>
        }
      >
        <ImoTotalTimeChart />
      </Figure>

      <DataTable
        headers={[
          "System",
          "All six proved",
          "Total proving time",
          "Verification",
        ]}
        rows={[
          [
            <strong key="d">Dirac (ours)</strong>,
            "Yes",
            <strong key="dt">7h 18m</strong>,
            "Comparator pass",
          ],
          ["Pramaana Hardy", "Yes", "8h 57m", "Comparator pass"],
          ["Axiom AxiomProver", "Yes", "24h 56m", "Comparator pass"],
        ]}
        note={
          <>
            Figures for Hardy and AxiomProver are taken from the results
            published by{" "}
            <ExtLink href="https://github.com/pramaana-labs/imo2026-lean">
              Pramaana Labs
            </ExtLink>{" "}
            and{" "}
            <ExtLink href="https://github.com/AxiomMath/IMO2026">
              Axiom Maths
            </ExtLink>
            , respectively. We thank both Pramaana and Axiom Maths for
            publishing their results.
          </>
        }
      />

      <H3 id="per-problem">Per problem</H3>

      <Figure
        n={2}
        caption={
          <>
            Time is not spread evenly across the paper. Q1, Q4 and Q5 are quick
            for every system; Q2, Q3 and Q6 account for most of Dirac&rsquo;s
            total.
          </>
        }
      >
        <ImoTimeByProblemChart />
      </Figure>

      <DataTable
        headers={[
          "Problem",
          "Dirac time",
          "Dirac lines",
          "Hardy time",
          "Hardy lines",
          "AxiomProver time",
          "AxiomProver lines",
        ]}
        rows={[
          ["Q1", "29m 05s", "513", "20m 26s", "393", "24m", "521"],
          ["Q2", "1h 20m 18s", "1,572", "2h 53m", "738", "6h", "1,224"],
          ["Q3", "2h 10m 28s", "2,697", "3h 04m", "2,772", "14h 29m", "4,229"],
          ["Q4", "15m 59s", "387", "16m 20s", "307", "39m", "520"],
          ["Q5", "18m 11s", "323", "31m 09s", "337", "1h 05m", "457"],
          ["Q6", "2h 44m 05s", "706", "1h 52m", "332", "2h 19m", "771"],
          [
            <strong key="t">Total</strong>,
            <strong key="dt">7h 18m 06s</strong>,
            <strong key="dl">6,198</strong>,
            <strong key="ht">8h 57m</strong>,
            <strong key="hl">4,879</strong>,
            <strong key="at">24h 56m</strong>,
            <strong key="al">7,722</strong>,
          ],
        ]}
      />

      <P>
        <strong>Dirac is faster overall</strong> and the margin comes from the
        hard end of the paper rather than from the easy problems.
      </P>

      <P>
        Q3 is where AxiomProver spent 14h 29m. Dirac cleared it in 2h 10m with a
        2,697-line proof, shorter than Hardy&rsquo;s 2,772 and well under
        AxiomProver&rsquo;s 4,229.
      </P>

      <P>
        Q2 is the geometry problem, historically the place where Lean proofs
        blow up in length and search time. Dirac finished in 1h 20m, against 2h
        53m for Hardy and 6h for AxiomProver, by attacking the problem through
        vectors and linear algebra rather than synthetic geometry. The trade-off
        is visible in the line count: our proof is more than twice the length of
        Hardy&rsquo;s.
      </P>

      <H2 id="cost">Cost</H2>

      <DataTable
        headers={["Problem", "Cost (USD)"]}
        rows={[
          ["Q1", "$15.18"],
          ["Q2", "$55.79"],
          ["Q3", "$29.53"],
          ["Q4", "$9.55"],
          ["Q5", "$15.47"],
          ["Q6", "$51.06"],
          [<strong key="t">Total</strong>, <strong key="c">$176.58</strong>],
        ]}
      />

      <H2 id="where-it-got-interesting">Where it got interesting</H2>

      <P>
        <strong>Q3.</strong> Dirac split the game into an upper bound and a
        lower bound, farmed out a large lemma toolkit to parallel sub-tasks,
        proved a long lower-bound argument, and assembled the pieces. It is our
        cleanest result of the six: faster and shorter.
      </P>

      <P>
        <strong>Q6.</strong> Dirac reduced the problem to a single crux lemma
        almost immediately, then spent roughly an hour stuck on the informal
        argument behind that crux. It eventually extracted a rigorous
        prime-bounding approach and formalized it cleanly. It got there, but the
        detour is why Q6 took 2h 44m and trails both competitors. It is the
        clearest target for the next iteration.
      </P>

      <H2 id="what-comes-next">What comes next</H2>

      <P>
        IMO 2026 is one benchmark, but it gives us a clear way to measure
        progress. Dirac is currently the fastest among the publicly reported
        systems we compared against, demonstrating that autonomous formal
        proving can be both rigorous and fast, while still leaving significant
        room for improvement.
      </P>

      <P>
        Our next focus is pushing Dirac further on proof decomposition,
        difficult crux arguments, and proving cost, while improving how quickly
        and effectively it can generalize its reasoning beyond mathematical
        formalization.
      </P>
    </>
  );
}
