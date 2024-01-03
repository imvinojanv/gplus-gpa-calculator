import { groq } from "next-sanity";

import { client } from "./lib/client";
import { buildQuery } from "./utils";

interface GetDegreesParams {
    type: string,
    slug?: string,
    id?: string
}

interface GetCoursesParams {
    id?: string
}

export const getUniversities = async () => {
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
    const { id } = params;

    try {
        if (id) {
            const courses = await client.fetch(
                groq`${buildQuery({
                    type: 'degree',
                    id
                })}{
                    "courses": courses[]->{
                        _id,
                        name,
                        courseCode,
                        credits,
                        year,
                        semester,
                        courseType
                    }
                }`
            );
            const res = courses[0].courses
            return res;
        }
        else {
            const courses = await client.fetch(
                groq`${buildQuery({
                    type: 'course'
                })}{
                    _id,
                    name,
                    courseCode,
                    credits,
                    year,
                    semester,
                    courseType
                }`
            );
            return courses;
        }
    } catch (error) {
        console.log("[FETCH_COURSES_ERROR]", error);
    }
}