"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Search } from "lucide-react";
import jobResult from "@/actions/job-result";

const datePostedChoice = [
  "any",
  "anyTime",
  "pastMonth",
  "pastWeek",
  "past24Hours",
];
const jobTypeChoice = ["any", "fullTime", "partTime", "contract", "internship"];
const experienceLevelChoice = [
  "internship",
  "associate",
  "director",
  "entryLevel",
  "midSeniorLevel",
];

const onsiteRemoteChoice = ["onSite", "remote", "hybrid"];

export default function FindJob() {
  const [datePosted, setDatePosted] = useState(datePostedChoice[0]);
  const [jobType, setJobType] = useState(jobTypeChoice[0]);
  const [experienceLevel, setExperienceLevel] = useState(
    experienceLevelChoice[0]
  );
  const [onsiteRemote, setOnsiteRemote] = useState(onsiteRemoteChoice[0]);
  const [jobTitle, setJobTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleSearch = async () => {
    try {
      setLoading(true);

      // Only add parameters that aren't the default "any" value
      const params = {};

      if (datePosted !== "any") params.datePosted = datePosted;
      if (jobType !== "any") params.jobType = jobType;
      if (experienceLevel !== "internship")
        params.experienceLevel = experienceLevel;
      if (onsiteRemote !== "onSite") params.onsiteRemote = onsiteRemote;
      if (jobTitle) params.keywords = jobTitle;

      const result = await jobResult(params);

      setData(result);
    } catch (error) {
      console.error("Error searching for jobs:", error);
      // You could add error state and display to user here
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-sm:px-4">
      {/* Filters */}
      <div className="container mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          <Input
            placeholder="Job title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />

          {/* DatePosted */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span className="text-muted-foreground">
                  {datePosted === "any"
                    ? "Date Posted"
                    : datePosted
                        .replace(/([A-Z])/g, " $1")
                        .trim()
                        .charAt(0)
                        .toUpperCase() +
                      datePosted
                        .replace(/([A-Z])/g, " $1")
                        .trim()
                        .slice(1)}
                </span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52">
              <DropdownMenuLabel>Date Posted</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {datePostedChoice.map((choice) => (
                <DropdownMenuItem
                  key={choice}
                  className="capitalize"
                  onClick={() => setDatePosted(choice)}
                >
                  {choice.replace(/([A-Z])/g, " $1").trim()}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Job Type */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span className="text-muted-foreground">
                  {jobType === "any"
                    ? "Job Type"
                    : jobType
                        .replace(/([A-Z])/g, " $1")
                        .trim()
                        .charAt(0)
                        .toUpperCase() +
                      jobType
                        .replace(/([A-Z])/g, " $1")
                        .trim()
                        .slice(1)}
                </span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52">
              <DropdownMenuLabel>Job Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {jobTypeChoice.map((choice) => (
                <DropdownMenuItem
                  key={choice}
                  className="capitalize"
                  onClick={() => setJobType(choice)}
                >
                  {choice.replace(/([A-Z])/g, " $1").trim()}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Experience Level */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span className="text-muted-foreground">
                  {experienceLevel === "internship"
                    ? "Experience Level"
                    : experienceLevel
                        .replace(/([A-Z])/g, " $1")
                        .trim()
                        .charAt(0)
                        .toUpperCase() +
                      experienceLevel
                        .replace(/([A-Z])/g, " $1")
                        .trim()
                        .slice(1)}
                </span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52">
              <DropdownMenuLabel>Experience Level</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {experienceLevelChoice.map((choice) => (
                <DropdownMenuItem
                  key={choice}
                  className="capitalize"
                  onClick={() => setExperienceLevel(choice)}
                >
                  {choice.replace(/([A-Z])/g, " $1").trim()}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Onsite/Remote */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span className="text-muted-foreground">
                  {onsiteRemote === "onSite"
                    ? "Onsite/Remote"
                    : onsiteRemote
                        .replace(/([A-Z])/g, " $1")
                        .trim()
                        .charAt(0)
                        .toUpperCase() +
                      onsiteRemote
                        .replace(/([A-Z])/g, " $1")
                        .trim()
                        .slice(1)}
                </span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52">
              <DropdownMenuLabel>Onsite/Remote</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {onsiteRemoteChoice.map((choice) => (
                <DropdownMenuItem
                  key={choice}
                  className="capitalize"
                  onClick={() => setOnsiteRemote(choice)}
                >
                  {choice.replace(/([A-Z])/g, " $1").trim()}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Search Button */}
        <div className="flex justify-center mt-6">
          <Button onClick={handleSearch} disabled={loading} className="px-8">
            {loading ? (
              "Searching..."
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Search Jobs
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Display jobs */}
      <div className="container mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {data.length > 0 ? (
            data.map((job) => (
              <Card
                key={job.id}
                className="border-2 hover:border-primary transition-colors duration-300"
              >
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription>{job.company.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{job.location}</p>
                  <p>{job.postDate}</p>
                </CardContent>
                <CardFooter>
                  <p>{job.benefits}</p>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-12 text-muted-foreground">
              {loading ? "Loading..." : "Search for jobs to see results"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
