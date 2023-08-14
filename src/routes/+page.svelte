<script>
  import { select, selectAll } from 'd3';
  // import { RoughSVG } from '$lib/components/RoughSVG.svelte';
  import { onMount } from 'svelte';
  import rough from 'roughjs';

  // for preloading images
	let imageModules = import.meta.glob("/static/images/maatregelen/*");

  export let data;
  console.log(data.data)

  function replaceChars(string){
    return string.replaceAll(' ','').replaceAll('/','').replaceAll(',','').replaceAll("'",'').replaceAll("(",'').replaceAll(")",'')
  }

  let svgElements = [];
  let temp;
  onMount(() => {
    svgElements.forEach((svg, index) => {
      const rc = rough.svg(svg);

      const boxtd = document.getElementsByClassName('cell')[0].getBoundingClientRect()

      const circle = rc.rectangle(0, 0, boxtd.width, boxtd.height, 
        { roughness: 0, 
          fill: '#93c38c', 
          stroke:'none',
          fillStyle:'solid',
          hachureGap: 3,
          strokeWidth:2
        });
      svg.appendChild(circle);
    });
  })

  const wijkOrder = [
    'Historische binnenstad',
    'Stedelijk bouwblok',
    'Volkswijk',
    'Tuindorp',
    'Vooroorlogse woonwijk',
    'Naoorlogse woonwijk',
    'Tuinstad laagbouw',
    'Tuinstad hoogbouw',
    'Hoogbouw',
    'Vinexwijk',
    'Villawijk',
    'Bloemkool-wijk',
    'Bedrijven-terrein',
    'Vernieuwd'
  ]

  const dataOrdered = []
  data.data.forEach(row => {
    dataOrdered.push(wijkOrder.map(wijk => row[wijk]))
  });

  console.log(dataOrdered)

  function mouseover(tekst){
    select('.' + replaceChars(tekst))
      .style('visibility', 'visible')
  }

  function mouseout(){
    selectAll('.tooltip')
      .style('visibility', 'hidden')
  }

</script>

<!-- preload images -->
<svelte:head>
	{#each Object.keys(imageModules) as imageUrl}
    <link rel="preload" as="image" href={imageUrl.slice(7)} />
	{/each}
</svelte:head>

<table>
  <tr>
    <th style="width:200px"></th>
    {#each wijkOrder as wijk, i}
      <th style="background-image:url('/images/wijken/{wijk}.png'); background-size: 100% 100%">{wijk}</th>
    {/each}
  </tr>
  {#each data.data as row, i}
    <tr class='normaltr'>
      <td class='maatregel-title' 
        on:mouseover={() => mouseover(row['tekst'])}
        on:mouseout={() => mouseout()}
      >
        <p class='maatregel_tekst'>{row['tekst']}</p>
      </td>
      {#each dataOrdered[i] as value, j}
        <td class='cell'><svg style='visibility:{(value === 'x' ? 'visible' : 'hidden')}' class='svg-container' bind:this={svgElements[i+j*dataOrdered[0].length]}></svg></td>
      {/each}
    </tr>
  {/each}
</table>

{#each data.data as maatregel, i}
  <div class='tooltip {replaceChars(maatregel['tekst'])}'>
    <img class='tooltip-img' src='/images/maatregelen/{replaceChars(maatregel['tekst'])}.jpg'/>
    <h2>{maatregel['tekst']}</h2>
    <p>{maatregel['omschrijving']}</p>
  </div>
{/each}


<style>
  table{
    width:99vw;
    height:67vh;
    table-layout: fixed;
    border-spacing: 3px 3px;
  }

  td{
    background-color: #e9ecf5;
    text-align: center;
    position: relative;
    color:rgb(96, 96, 96);
    height:3vh;
    font-size:0.95vw;
  }

  th{
    font-size:0.9vw;
    /* color:rgb(96, 96, 96); */
    color:white;
    word-wrap: break-word;
    font-weight:normal;
    text-shadow:
    -1px -1px 0 #000,  
      1px -1px 0 #000,
      -1px 1px 0 #000,
      1px 1px 0 #000;
  }

  .normaltr:hover{
    filter: brightness(1.05);
  }

  .maatregel-title{
    border: #e9ecf5 solid;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .maatregel-title:hover{
    border: white solid;
    background-color: #e9ecf5;
  }

  .maatregel_tekst{
    font-size: 14px;
    pointer-events: none;
  }

  svg{
    width:100%;
    height:100%;
    position: absolute;
    left:0;
    top:0;
  }

  .tooltip{
    background-color: white;
    position:fixed;
    width:40%;
    height:fit-content;
    top:10%;
    left:216px;
    box-shadow: 0 8px 15px rgb(0 0 0 / 0.5);
    border-radius: 3%;
    text-align: center;
    padding: 30px;
    visibility: hidden;
  }

  .tooltip-img{
    width:90%;
    border-radius: 1%;
  }

</style>