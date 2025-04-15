import { Persona } from "@/types";

  // Sample data with personaDetails as stringified JSON
  export const personas: Persona[] = [
    {
      id: "p1",
      createdAt: new Date(),
      userId: "u1",
      listingName: "John Smith",
      personaDetails: JSON.stringify({
        verdict: "High Potential",
        confidence: "High",
        reason:
          "Serious buyer with clear requirements and sufficient budget for the property type. Timeline aligns with current market offerings.",
        profile: {
          budget: "$750,000 - $850,000",
          propertyType: "Single-family home, 3-4 bedrooms",
          locationPriorities: "School district, proximity to downtown",
          mustHaveFeatures: ["Home office", "Modern kitchen", "Backyard"],
          dealBreakers: ["Busy street", "Needs major renovation"],
          timeline: "Ready to buy within 1-2 months",
        },
      }),
      approved: true,
    },
    {
      id: "p2",
      createdAt: new Date(Date.now() - 86400000), // 1 day ago
      userId: "u2",
      listingName: "Emily Johnson",
      personaDetails: JSON.stringify({
        verdict: "Medium Potential",
        confidence: "Medium",
        reason:
          "Interested buyer but budget may be slightly below market value for desired features. Timeline is flexible which could work in their favor.",
        profile: {
          budget: "$500,000 - $550,000",
          propertyType: "Condo or townhouse, 2 bedrooms",
          locationPriorities: "Near public transportation, walkable neighborhood",
          mustHaveFeatures: ["Gym in building", "Updated bathroom", "Balcony"],
          dealBreakers: ["Ground floor unit", "No parking"],
          timeline: "Looking to buy in next 3-6 months",
        },
      }),
      approved: true,
    },
    {
      id: "p3",
      createdAt: new Date(Date.now() - 172800000), // 2 days ago
      userId: "u3",
      listingName: "Michael Rodriguez",
      personaDetails: JSON.stringify({
        verdict: "Low Potential",
        confidence: "High",
        reason:
          "Budget is significantly below market value for the requirements. Many must-have features that increase price point substantially.",
        profile: {
          budget: "$300,000 - $350,000",
          propertyType: "Single-family home, 4+ bedrooms",
          locationPriorities: "Gated community, waterfront view",
          mustHaveFeatures: ["Pool", "Smart home features", "Large yard", "Luxury finishes"],
          dealBreakers: ["Older than 5 years", "Shared driveway"],
          timeline: "No specific timeline, just browsing",
        },
      }),
      approved: true,
    },
    {
      id: "p4",
      createdAt: new Date(Date.now() - 259200000), // 3 days ago
      userId: "u4",
      listingName: "Sarah Williams",
      personaDetails: JSON.stringify({
        verdict: "Not a Buyer",
        confidence: "High",
        reason:
          "Appears to be gathering information for future reference. No immediate buying intent and unrealistic expectations for the market.",
        profile: {
          budget: "Not specified",
          propertyType: "Luxury penthouse or villa",
          locationPriorities: "Exclusive neighborhoods only",
          mustHaveFeatures: ["Panoramic views", "Private elevator", "Wine cellar"],
          dealBreakers: ["Any neighbors within view", "Less than 3000 sq ft"],
          timeline: "Just researching for someday",
        },
      }),
      approved: true,
    },
    {
      id: "p5",
      createdAt: new Date(Date.now() - 345600000), // 4 days ago
      userId: "u5",
      listingName: "David Chen",
      personaDetails: JSON.stringify({
        verdict: "High Potential",
        confidence: "Medium",
        reason:
          "Investor with clear budget and requirements. Has purchased similar properties before and is ready to move quickly.",
        profile: {
          budget: "$1M - $1.5M",
          propertyType: "Multi-family property or small apartment building",
          locationPriorities: "Growing neighborhoods, near universities",
          mustHaveFeatures: ["Good rental history", "Low maintenance", "Separate utilities"],
          dealBreakers: ["HOA restrictions on renting", "High property taxes"],
          timeline: "Ready to make an offer immediately for the right property",
        },
      }),
      approved: true,
    },
  ]