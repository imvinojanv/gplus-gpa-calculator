# Push the custom URL to search

## METHOD 1:

-- universities.tsx --
    `
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const selectedUniversity = searchParams.get("university");
    const currentTitle = searchParams.get("title");

    const onClick = (slug: string) => {
        const isSelected = selectedUniversity === slug;

        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                title: currentTitle,
                university: isSelected ? null : slug,
            }
        }, { skipNull: true, skipEmptyString: true });

        router.push(url, { scroll: false });
        router.refresh();
    }

    {universities.map((university: any) => (
        <div
            key={university._id}
            onClick={() => onClick(university.slug)}
            className={cn(
                '...default-classes...',
                selectedUniversity === university.slug && "...selected-classes...",
            )}
        >
            ... 
        </div>
    ))}
    `


## METHOD 2:

-- sidebar-routes.tsx --
    `
    const [year, setYear] = useState('1')

    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const selectedYear = searchParams.get("year");
    const currentTitle = searchParams.get("title");

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                title: currentTitle,
                year: year,
            }
        }, { skipNull: true, skipEmptyString: true });
    
        router.push(url);
        router.refresh();       // not neccessary
    }, [year, currentTitle, router, pathname]);

    {navRoutes.map((route) => (
        <div
            key={route.path}
            onClick={() => setYear(route.path)}
            className={cn(
                "...default-classes...",
                selectedYear === route.path && "...selected-classes..."
            )}
        >
            ...
        </div>
    ))}
    `


## METHOD 3: 

    `
    const pathname = usePathname();
    const searchParams = useSearchParams();

    {universities.map((university: any) => {
        const uniSearchParams = new URLSearchParams(searchParams.toString());
        uniSearchParams.set('university', university.slug);
        const isActive = searchParams.get('university') === university.slug;

        const uniURL = createUrl(pathname, uniSearchParams);        // lib/create-url.ts

        return (
            <Link
                key={university._id}
                href={uniURL}
                className={cn(
                    '...default-classes...',
                    isActive && "...selected-classes..."
                )}
            >
                ...
            </Link>
        )
    })}
    `

-- create-url.ts --
    `
    import { ReadonlyURLSearchParams } from 'next/navigation';

    export const createUrl = (
        pathname: string,
        params: URLSearchParams | ReadonlyURLSearchParams
    ) => {
        const paramsString = params.toString();
        const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

        return `${pathname}${queryString}`;
    };
    `