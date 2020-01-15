---
title: "Coding Anytime Anywhere"
date: 2019-02-08
draft: false
tags: ["elixir"]
keywords: "elixir"
description: "Use Elixir write hello world"
---

## Coding Anytime Anywhere
```elixir
(for x <- [<<65>><>"ny"], y <- ~w(time where), do: x <> y)
|> Enum.reduce('Co'++~c(deing)--[101], &([&2|["\s"|&1]]))
|> IO.puts
```

## Data Transform
```elixir
File.read!("./data.txt") 
|> String.split("\n") 
|> Enum.map(fn x -> {:ok, date, _} = DateTime.from_iso8601("2019-08-12T" <> x <> "Z"); date end) 
|> Enum.group_by(fn x -> x end) 
|> Enum.map(fn {k, v} -> [k, length(v)] end) 
|> Enum.sort(fn l, r -> l <= r end) 
|> Enum.reduce("", fn x, acc -> d = Enum.at(x, 0); acc <> "#{d.year}/#{d.month}/#{d.day} #{d.hour}:#{d.minute}:#{d.second}" <> ", #{Enum.at(x, 1)}"  <> "\n" end) |> (fn s -> File.write("./data.csv", s) end).()
```