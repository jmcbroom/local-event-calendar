import client from "./sanity";

export async function getSiteSettings() {
  const data = await client.fetch(`*[_type == 'siteSettings'][0]`);
  return data;
}

export async function getSingletonByName(name) {
  const data = await client.fetch(`*[_id == 'singleton-${name}'][0]`)
  return data
}

export async function getUpcomingEvents() {
  let query = `
    *[
      _type == 'event'
      &&
      dateTime(startTime) > dateTime(now())
    ] | order(startTime asc)
    {
        "id": _id,
        "type": _type,
        _updatedAt,
        title,
        "slug": slug['current'],
        startTime,
        price,
        synopsis,
        eventType,
        eventLink,
        ticketLink,
        venue->{
          name, 
          "slug": slug['current'],
          address,
          city
        }
    }
  `

  const data = await client.fetch(query)
  return data;
}

export async function getVenueSlugs () {
  let query = `
    *[
      _type == 'venue'
      &&
      !(_id in path("drafts.**"))
    ]
    {
      "id": _id,
      name,
      "slug": slug['current']
    }
  `

  const data = await client.fetch(query)
  return data
}

export async function getEventSlugs () {
  let query = `
    *[
      _type == 'event'
      &&
      !(_id in path("drafts.**"))
    ]
    {
      "id": _id,
      name,
      "slug": slug['current']
    }
  `

  const data = await client.fetch(query)
  return data
}

export async function getAllVenues() {
  let query = `
    *[
      _type == 'venue'
      &&
      !(_id in path("drafts.**"))
    ]
    {
      ...,
    "nextEvent": *[
        _type == 'event'
          &&
        references(^._id)
          &&
        dateTime(startTime) > dateTime(now())
      ] | order(startTime asc)[0] {
        "slug": slug['current'],
        title,
        synopsis,
        startTime,
        price,
        "type": _type
      }
    }
  `

  const data = await client.fetch(query)
  return data
}

export async function getVenueById(slug) {
  let q = `*[_type == 'venue' && slug['current'] == '${slug}']{
    ...,
    "events": *[
      _type == 'event'
        &&
      references(^._id)
        &&
      dateTime(startTime) > dateTime(now())
    ] | order(startTime asc) {
      "slug": slug['current'],
      title,
      synopsis,
      startTime,
      endTime,
      price,
      eventLink,
      ticketLink,
      "type": _type
    }
  }`;
  const data = await client.fetch(q);
  return data[0];
}

export async function getEventBySlug(slug) {
  let q = `*[_type == 'event' && slug['current'] == '${slug}']{
    ...,
    venue->{
      name, 
      slug,
      address,
      city
    }
  }`;
  const data = await client.fetch(q);
  return data[0];
}