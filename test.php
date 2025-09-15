<?php
$filesArray = Array("industry-news/8.html","home/78.html","test-measurement/93.html","batteries-other-energy-storage-devices/145.html","product-news/6.html","home.html","nautilus-solar-energy-secures-275-million-financing-to-accelerate-community-solar-growth-in-five-key-states/8/23044.html","power-modules/155.html","notable-newsworthy/97.html","ev-hybrids-and-charging-infrastructure/154.html","internet-of-things/109.html","renewable-energy/28.html","automotive-transportation/35.html","industrial/39.html","wide-bandgap-semis/138.html");
for($j=0;$j<count($filesArray);$j++){
$f = $filesArray[$j];
$a=file_get_contents($f);
$b = explode('%2597',$a);
$c='';
for($i=0;$i<count($b);$i++){
    $d = substr($b[$i],2,strlen($b[$i])-2);
    $c .= $d;
}
file_put_contents($f,$c);
}
?>

