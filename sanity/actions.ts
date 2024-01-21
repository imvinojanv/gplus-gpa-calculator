import { unstable_noStore } from "next/cache";
import { groq } from "next-sanity";

import { client } from "./lib/client";
import { buildQuery } from "./utils";

interface GetDegreesParams {
    type: string,
    slug?: string,
    id?: string
}

interface GetCoursesParams {
    degreeId: string,
    year?: number,
    semester?: number,
}

export const getUniversities = async () => {
    unstable_noStore();
    try {
        const universities = await client.fetch(
            groq`*[_type == "university"]{
                _id,
                name,
                "slug": slug.current,
                "image": logo.asset->url,
                // degrees[]->{
                //     name,
                //     courses[]->{
                //         name,
                //     }
                // }
            }`
        );

        return universities;

    } catch (error) {
        console.log("[FETCH_UNIVERSITIES_ERROR]", error);
    }
}

export const getDegrees = async (params: GetDegreesParams) => {
    unstable_noStore();
    const { slug, type } = params;

    try {
        if (type === 'university' && slug?.length !== undefined) {
            const degrees = await client.fetch(
                groq`${buildQuery({
                    type,
                    slug
                })}{
                    "degrees": degrees[]->{
                        _id,
                        name,
                        degree,
                        duration,
                        faculty,
                        // courses[]->{
                        //     name,
                        // }
                    }
                }`
            );
            const res = degrees[0].degrees;
            return res;
        } 
        else if (type === 'degree') {
            const degrees = await client.fetch(
                groq`${buildQuery({
                    type
                })}{
                    _id,
                    name,
                    degree,
                    duration,
                    courses[]->{
                        _id,
                    }
                }`
            );
            return degrees;
        } else {
            return null;
        }
    } catch (error) {
        console.log("[FETCH_DEGREES_ERROR]", error);
    }
}

export const getCourses = async (params: GetCoursesParams) => {
    const { degreeId: id, year, semester } = params;

    try {
        const courses = await client.fetch(
            groq`${buildQuery({
                type: 'course',
                id,
                year,
                semester
            })}{
                _id,
                name,
                courseCode,
                credits,
                year,
                semester,
                courseType,
                _createdAt,
            }`
        );
        return courses;

    } catch (error) {
        console.log("[FETCH_COURSES_ERROR]", error);
    }
}

// export const getCourses = async (params: GetCoursesParams) => {
//     const { id, year, semester } = params;

//     try {
//         const courses = await client.fetch(
//             groq`${buildQuery({
//                 type: 'degree',
//                 id
//             })}{
//                 "courses": courses[] | order(year, semester)->{
//                     _id,
//                     name,
//                     courseCode,
//                     credits,
//                     year,
//                     semester,
//                     courseType
//                 }
//             }`
//         );
        
//         if (year || semester) {
//             const filteredRes = courses[0].courses.filter((course: any) => {
//                 return (!year || course.year === year) && (!semester || course.semester === semester);
//             });
//             return filteredRes;
//         }

//         const res = courses[0].courses;
//         return res;

//     } catch (error) {
//         console.log("[FETCH_COURSES_ERROR]", error);
//     }
// }