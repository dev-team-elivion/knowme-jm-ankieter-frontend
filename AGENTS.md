# Working in this repo

Read this before writing code. It is the short version of decisions already made here, so you do not have to rediscover them.

## Before you build anything new

Look at two or three existing views or components that do the same kind of job, and copy their direction.

Adding a table? Open `DataTable` in `src/components/dataTable/` and `DevTableSection` in `src/views/devPatterns/` first. Adding a form? Open `DevFormSection` and the `FormProviderKnowMe` fields in `src/components/form/`. Adding a filter bar, an empty state, a status pill, a stats card: same rule.

What you are looking for: which shared component already exists, which spacing and radius values are used, where the translation keys live, how loading and empty states are handled. Then match it. A new screen that looks like it came from a different app is a bug, even if it compiles.

If nothing analogous exists, say so before inventing a pattern.

## Where files go

Filenames carry their role as a suffix. This is enforced by convention, not tooling, so follow it.

| Suffix | What it holds |
| --- | --- |
| `X.view.tsx` | A routed screen. One per route. |
| `X.comp.tsx` | Any other component. |
| `useX.util.ts` | A hook: data fetching, or anything stateful and reusable. |
| `x.util.ts` | Pure helpers. No React. |
| `X.model.ts` | Types, interfaces, form models. |
| `X.enum.ts` | Enums. |
| `useX.validation.ts` | Yup schemas. |
| `X.styles.ts` | Extracted `sx` objects and style functions. |
| `X.context.ts` | Context definition, with its provider in `X.provider.tsx`. |
| `x.guard.ts` | Type guards. |

Features are organised by domain, not by type. A view owns its folder:

```
src/views/usersList/
  UsersList.view.tsx
  components/
    UsersListTable/
  util/
    useGetUsersList.util.ts
    useUpdateUser.util.ts
  model/
    UsersListSearchForm.model.ts
    useUsersListSearchFormValidation.validation.ts
```

Keep things local until a second feature needs them. Only then promote to `src/components/`, `src/utils/`, or `src/hooks/`. Do not start by putting a one-off component in the global folder.

## Lint and type checks

The repo runs ESLint with `--max-warnings 0`, plus Prettier and `perfectionist` sorting rules. Unsorted props or imports are errors here, not nitpicks.

Scope your checks to the files you touched. Do not run `npm run lint` across the whole project and do not try to fix warnings in files you did not edit. The codebase has pre-existing warnings that are not yours to clean up in a feature branch, and a full-project run buries your own output.

```bash
npx eslint path/to/File.comp.tsx path/to/other.ts --max-warnings 0
npx eslint path/to/File.comp.tsx --fix
npx tsc --noEmit
```

`tsc` has no per-file mode, so run it whole and only care about errors in files you touched. If the run surfaces errors elsewhere, mention them and leave them alone.

Never commit code that has not passed lint. If lint reports something you disagree with, fix the code rather than adding a disable comment. `// eslint-disable-next-line` is a signal you picked the wrong structure.

## Text and translations

Never hardcode user-facing strings. Every label, button, heading, tooltip, empty state, toast, dialog body, and validation message goes through i18n.

How it works here:

- English file defines the type and is the source of shape: `x.translation.en.ts` exports both `xTranslation` and the `XTranslation` interface.
- Polish file imports that type and implements it: `x.translation.pl.ts`.
- Files live under `src/assets/locales/`, one pair per namespace (`components/components.translation.en.ts`, `views/views.translation.en.ts`). A feature adds a nested key block inside its namespace file.
- Read them with `useTranslationWithPrefix('components.dataTable')`, then `t('someKey')`.
- Both languages must be updated in the same commit. A missing PL key is a visible bug.
- Keys for enum values use the actual DTO string, not the TypeScript property name: `DRAFT`, `ACTIVE`, not `draft` or `Draft`.
- Countable strings in Polish need `_one`, `_few` and `_many`. A base key plus `_other` renders the singular for every count, with no warning ("204 osoba"). The EN interface declares `X_one` plus optional `X_few?`, `X_many?`, `X_other?`; EN implements `_one` and `_other`, PL implements `_one`, `_few` and `_many`. Check forms with `new Intl.PluralRules('pl').select(n)`.
- Do not pass `defaultValue` to `t()`. It hides a missing key, and the default renders in the wrong language.
- Read arrays and objects with `t(key, { returnObjects: true })`, never `i18n.getResourceBundle(i18n.language, ...)`, which skips language fallback.
- If an untranslated string does not exist anywhere in the repo, it comes from the server. That is a backend fix, not a client-side override map.

## How the copy should read

Users of this app are HR and employees, not developers. Write like a person explaining something, not like a system reporting its internal state.

Rules:

- No technical vocabulary in the UI. Never mention backend, API, endpoint, request, response, payload, DTO, validation schema, HTTP codes, or exception names.
- Never surface a raw server message. "Backend odrzucił żądanie" is not an error message, it is a stack trace with manners. Say what happened and what to do: "Nie udało się zapisać zmian. Spróbuj ponownie."
- Say what the person can do next. An error that offers no next step is half written.
- Keep it short and concrete. One idea per sentence. Prefer "Dodaj uczestnika" over "Wykonaj akcję dodania uczestnika do listy".
- Plain verbs. "Zapisz", "Usuń", "Wyślij". Not "Dokonaj zapisu".
- Neutral, calm tone. No exclamation marks, no emoji, no apologising, no cheerleading.
- Match the Polish already in the app. Formal, impersonal, second person for actions the user takes.

Things that make copy read as machine-generated, all of which are banned:

- Padding and hedging: "Należy zauważyć, że", "W celu wykonania", "Może potencjalnie". Cut straight to the point.
- Inflated significance: "kluczowy", "istotny element", "stanowi", "odgrywa ważną rolę". Just describe the thing.
- Marketing adjectives: "kompleksowy", "intuicyjny", "zaawansowany", "innowacyjny".
- Forced triples. Two items are fine. Three items because three sounds complete is not.
- Vague authority: "Eksperci wskazują", "System sugeruje" when nothing is actually suggesting anything.
- Em dashes as connective tissue. Use a comma, a full stop or a semicolon.
- Synonym cycling. If the entity is "Plan Rozwojowy", call it that every time. Do not alternate with "ścieżka", "program", "dokument".
- Bold labels stapled to the front of list items.
- Headings in Title Case. Sentence case only.

Before shipping copy, read it aloud. If it sounds like a press release or a chatbot, rewrite it.

## jain3 style direction

Visual language for anything new. Tokens live in `src/config/theme/uiTokens.ts`, colors in `themeColors.ts`, reached through `const theme = useTheme()` and `theme.colors.X`.

- Cards and panels: `panelSx(colors)`. 20px radius, `bgCard`, 1px `border`, `shadowCard`. Nested panels use `innerPanelSx` at 16px.
- No rails, no hairline dividers, no MUI `Divider` between sections. Separation comes from the panel edges and spacing.
- Section headings: `sectionLabelSx(colors)`. Small, uppercase, heavy weight, muted, with the trailing rule built in.
- Tiny metadata labels: `microLabelSx(color)`. 10px, uppercase, letterspaced.
- Statuses are pills, never plain colored text: `statusPillSx(color)`. Tinted background at 1A, border at 40, rounded full.
- Icons sit in tiles: `iconTileSx(background, size, borderColor)`. 12px radius. Section headers get an icon tile on the left.
- Progress uses `progressBarSx(colors, from, to)` with a gradient fill, not a flat bar.
- Numbers use `numericSx` so columns line up.
- Entry animation: `revealSx(index)` with a staggered index across sibling cards. One coordinated reveal per screen, not motion sprinkled everywhere.
- Accent color carries emphasis. `accent`, `accentBg`, `accentBorder`, plus `gold` for highlight states. Do not introduce new hex values; if a color is missing, add it to `themeColors.ts`.
- Info notices use `InfoCallout`, not MUI `Alert severity="info"`.
- Dialogs use plain MUI `<Dialog>`. It is already themed globally in `components.ts`, so do not restyle paper, title, or actions locally.
- Tables use `DataTable` from `src/components/dataTable/` with its shared `DataTable.styles.ts`.
- `MuiButton` defaults to `variant="contained"`, the gold fill. Cancel and tertiary buttons need an explicit `variant="text"`, secondary ones `variant="outlined"`. Without it, a text-color sx reads as a disabled button and a border sx renders as invisible text.
- Readable text uses `textSecondary`. `textMuted` is about 1.5:1 on dark cards, so keep it for decorative fills.
- `accent` and `gold` are the same `#F9BA42` in both modes, about 1.7:1 on white. Use them for fills, pills and borders, not as text color on light backgrounds.
- Filter selects: style the trigger only. Do not override `MenuProps` paper or individual `MenuItem` styles; the global theme owns the dropdown.
- Filter bars align to the bottom (`alignItems: 'flex-end'`). No helper text under a single filter, because it pushes that field out of line.

Dark and light are both real. Anything you write with hardcoded colors will break one of them. Read color values from `theme.colors`, never from `themeColors.ts`, because those values are fixed to one mode. Importing the `ThemeColorSet` type from it is fine.

## Data fetching

Every request lives in its own hook file, so query keys, cache invalidation, and DTO mapping stay in one place. A component never calls `useApiClient`, `useQuery`, or `useMutation` directly.

File rules:

- One hook per file, named after what it does: `useGetCertificationParticipants.util.ts`, `useUpdateProfessionalActivityDefinition.util.ts`.
- The file lives in a `util/` or `hooks/` folder next to the feature that uses it, not in a global bucket.
- The file exports the hook and its `Filters` / `Req` / `Return` types, nothing else.
- Query keys come from `QueryKeyEnum` in `@/api/model/QueryKey.enum.ts`. Never write a raw string key. Add a new enum member if you need one.
- The API instance comes from `useApiClient()`. Do not import axios or build URLs by hand.
- Return a narrow object, not the whole react-query result. The component should get what it needs and no more.

A read hook. The names below are illustrative and do not exist in this repo; `src/hooks/useCurrentUser.util.ts` is the working example here.

```ts
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ProfessionalActivityDefinitionListResponseDto } from '@/api/generated';
import { QueryKeyEnum } from '@/api/model/QueryKey.enum.ts';
import { useApiClient } from '@/api/useApiClient.util.ts';

type Filters = {
  page?: number;
  pageSize?: number;
  search?: string;
};

type Return = {
  data: ProfessionalActivityDefinitionListResponseDto | undefined;
  isLoading: boolean;
};

export const useProfessionalActivityDefinitions = (filters: Filters): Return => {
  const { professionalActivityDefinitionsApi } = useApiClient();

  const { data, isLoading } = useQuery<ProfessionalActivityDefinitionListResponseDto, AxiosError>({
    queryFn: async () => {
      const { data } = await professionalActivityDefinitionsApi.getProfessionalActivityDefinitions(
        filters.page,
        filters.pageSize,
        filters.search,
      );
      return data;
    },
    queryKey: [QueryKeyEnum.LIST_PROFESSIONAL_ACTIVITY_DEFINITIONS, filters],
  });

  return { data, isLoading };
};
```

What makes it good: explicit `useQuery<Dto, AxiosError>` generics so nothing is inferred as `any`, the response DTO comes from `@/api/generated`, everything the key depends on is in the key array, and the return type is declared up front.

A write hook does the same and owns its cache invalidation:

```ts
const { isPending, mutateAsync } = useMutation<DetailDto, AxiosError, Req>({
  mutationFn: async ({ definitionId, description }) => {
    const { data } = await api.updateProfessionalActivityDefinition(definitionId, { description });
    return data;
  },
  onSuccess: (_data, { definitionId }) => {
    void queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.LIST_X] });
    void queryClient.invalidateQueries({ queryKey: [QueryKeyEnum.X_DETAIL, definitionId] });
  },
});

return { isPending, updateDefinition: mutateAsync };
```

Other things that belong in the hook, not the component: `enabled` guards for missing ids, default page sizes as module constants, and any mapping from DTO shape to view shape.

### The generated client

`src/api/generated/` is produced by `npm run generate:api` (or `generate:api:win`) from the backend's OpenAPI spec.

- Never edit anything under `generated/` by hand. Your change disappears on the next run and takes the next person an hour to work out.
- If a field or endpoint is missing, the backend spec is what needs updating. Regenerate afterwards; do not patch around it locally.
- Regenerating touches a lot of files. Commit it on its own, separate from feature work, so the diff stays reviewable.

## Loading and empty states

Three states, every time: loading, empty, loaded. A list that renders a blank box while fetching is not finished.

- Loading: a skeleton matching the real layout is better than a spinner in the middle of nowhere. `FullPageSpinner` is for route-level loads only.
- Empty: say what is missing and what the user can do about it, in i18n copy. "Brak wyników" alone is not enough if a filter caused it. Distinguish "nothing here yet" from "nothing matches your filters", because the fix is different.
- Error: a calm message with a retry, following the copy rules above. Never the raw failure.
- Do not let layout jump between states. Reserve the space.
- Check what an analogous view already does before writing your own. Several already handle this well.

## Permissions and roles

- There is no permission helper yet. When the first check is needed, add one `usePermissions` hook typed against the generated DTO and route every check through it.
- Current user data comes from `useCurrentUserContext()`. Do not re-fetch it.
- Routes are defined in `src/models/route/routes.ts`; route-level gating belongs there.
- Hiding a button is not authorization. It is a courtesy so users do not click things that will fail. The server is what actually enforces access, so never assume a hidden control means an unreachable action, and never build a flow whose safety depends only on the UI.
- Do not invent a new role check by reading a role string and comparing it. Use the permission that describes the capability.
- When an action is unavailable, prefer showing it disabled with a reason over hiding it, unless the whole feature is irrelevant to that role.
- Only a 401 redirects to SSO. A 403 is a refusal inside the app: reads render their own denied or empty state, writes show a permission message. Branch on the HTTP status, not on backend internal error codes.

## Dates

Dates are where quiet production bugs come from. The repo has no date library or date helpers yet. When the first feature needs dates, ask which library to use, then put all formatting and parsing in `src/utils/formatDate.util.ts` so nothing hand-rolls it.

- Display format is `YYYY-MM-DD`, plus `HH:mm` when time matters.
- When sending a date-only value to the server, attach the local offset so the day does not shift.
- When reading a timestamp, trust the offset the server sent.
- Do not do arithmetic on raw `Date` objects.
- Cross-field date validation belongs in the Yup schema, not in a submit handler, with its message in `validation.translation.*.ts`.

## Type safety

Everything is typed. `any` is a bug you have not hit yet.

- Never write `any`, `as any`, or `@ts-ignore`. If you reach for one, the types are telling you the data flow is wrong.
- If a value is genuinely unknown, type it `unknown` and narrow it with a guard. There are guards in the repo already, such as `isAxiosError.guard.ts`.
- Avoid `as` casts in general. A cast silences the compiler without changing the value. Prefer a guard, a generic parameter, or fixing the source type.
- The generated DTOs in `@/api/generated` are the source of truth for server data. Do not hand-write a parallel interface that duplicates one, and do not widen a DTO field to `string` because an enum is inconvenient.
- Type props explicitly with a `Props` type per component. No implicit `any` on handlers or map callbacks.
- Type hook return values explicitly (`): Return =>`) rather than relying on inference. It keeps the contract visible and stops accidental widening.
- Enum values come from the generated enums, never from string literals typed by hand.

## Code style

### File size
- Components: 200 to 400 lines typical, 800 hard max.
- Past ~400 lines, extract private sub-components into sibling files.
- Name siblings after what they own: `Dashboard.comp.tsx` becomes `DashboardCards.comp.tsx`, `RoleAwareDashboard.comp.tsx`.
- Split earlier than the limit when a block grows its own hooks or logic.

### Components, not render functions
- Never write `renderX()` helpers that close over parent state. Extract `<ComponentX />` with explicit props.
- Prop contracts make coupling visible. Closure coupling hides it until it breaks.

### Theme access
- `const theme = useTheme()` at the top, then `theme.colors.X`.
- Prefer that over `sx={{ color: theme => theme.colors.X }}` callback form. This project uses the hook. 

### Context over prop drilling
- If a context is available at the call site, consume it with its hook.
- Do not thread `role`, `isOwner`, or similar derivable values through several levels of props.

### Derived state over useEffect
- Prefer `const x = a ?? (condition ? b : null)` over `useState` plus `useEffect` to initialize from async data.
- Initializing state in an effect needs a lint suppression, which means the structure is wrong. Restructure instead.

### Utilities
- Pure helpers (formatters, predicates, transformers) live in `util/*.util.ts`.
- Component files export components and nothing else.

### Shared infrastructure
- Duplicate routes rendering the same component collapse into one `path="section/*"` Route.

### Forms
- `FormProviderKnowMe` with react-hook-form and Yup, plus `TextFormField` / `SelectFormField` from `src/components/form/`.
- Validation messages come from `validation.translation.*.ts`, never inline strings.
- Length and count limits go in the Yup schema. With `yupResolver`, field-level `rules` such as `maxLength` never run. For a hard input cap, add `inputProps={{ maxLength: N }}` as well.

### No comments
- Do not add inline or block comments. Name things well instead.

### Immutability
- Never mutate. Return new structures: `{ ...obj, key: value }`, `[...arr, item]`.

## Commits

- Lowercase, short, plain description of what changed.
- No conventional commit prefixes (`feat:`, `fix:`).
- Lint-clean before commit, every time.
