import { groq } from "next-sanity";

import { client } from "./lib/client";
import { buildQuery } from "./utils";

interface GetDegreesParams {
    type: string,
    slug?: string,
    id?: string
}

interface GetCoursesParams {
    id: string
}

export const getUniversities = async () => {
    try {
        const universities = await client.fetch(
            groq`*[_type == "university" && slug.current == "uok"]{
                _id,
                name,
                "slug": slug.current,
                "image": logo.asset->url,
            }`
        );

        return universities;

    } catch (error) {
        console.log("[FETCH_UNIVERSITIES_ERROR]", error);
    }
}

export const getDegrees = async (params: GetDegreesParams) => {
    const { slug, id, type } = params;

    try {
        if (type === 'university') {
            const degrees = await client.fetch(
                groq`${buildQuery({
                    type,
                    id,
                    slug
                })}{
                    degrees[]->{
                        _id,
                        name,
                        degree,
                        duration,
                        courses[]->{
                            _id,
                        }
                    }
                }`
            );
            return degrees;
        } 
        else if (type === 'degree') {
            const degrees = await client.fetch(
                groq`${buildQuery({
                    type,
                    id,
                    slug
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
        }

    } catch (error) {
        console.log("[FETCH_DEGREES_ERROR]", error);
    }
}

export const getCourses = async (params: GetCoursesParams) => {
    const { id } = params;

    try {
        const courses = await client.fetch(
            groq`${buildQuery({
                type: 'course',
                id
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

    } catch (error) {
        console.log("[FETCH_COURSES_ERROR]", error);
    }
}